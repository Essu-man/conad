use sha2::{Digest, Sha256};
use rusqlite::Connection;
use crate::db::models::MerchantBillingInfo;

pub struct FeeEngine;

impl FeeEngine {
    pub const DEFAULT_FEE_PERCENT: f64 = 2.0;

    /// Calculate fee breakdown for an incoming sale
    pub fn calculate_fee(total_amount: f64, fee_percent: f64) -> (f64, f64) {
        let fee = (total_amount * (fee_percent / 100.0) * 100.0).round() / 100.0;
        let net = total_amount - fee;
        (fee, net)
    }

    /// Retrieve the previous transaction's hash from the ledger, or return genesis hash
    pub fn get_last_tx_hash(conn: &Connection) -> String {
        conn.query_row(
            "SELECT tx_hash FROM sales ORDER BY rowid DESC LIMIT 1",
            [],
            |row| row.get(0),
        )
        .unwrap_or_else(|_| "0000000000000000000000000000000000000000000000000000000000000000".to_string())
    }

    /// Generate an immutable cryptographic hash chain for this transaction
    pub fn compute_tx_hash(
        prev_hash: &str,
        receipt_number: &str,
        cashier_id: &str,
        total_amount: f64,
        payment_method: &str,
        timestamp: &str,
    ) -> String {
        let mut hasher = Sha256::new();
        let payload = format!(
            "{}:{}:{}:{:.2}:{}:{}",
            prev_hash, receipt_number, cashier_id, total_amount, payment_method, timestamp
        );
        hasher.update(payload.as_bytes());
        format!("{:x}", hasher.finalize())
    }

    /// Process billing adjustments in the local merchant wallet
    pub fn process_merchant_billing(
        conn: &Connection,
        total_amount: f64,
        platform_fee: f64,
        payment_method: &str,
    ) -> Result<MerchantBillingInfo, rusqlite::Error> {
        let now = chrono::Utc::now().to_rfc3339();

        // If payment is cash, platform fee is deducted from merchant's prepaid balance
        let balance_deduction = if payment_method.to_lowercase() == "cash" {
            platform_fee
        } else {
            0.0 // Digital payments are split-settled automatically via Paystack
        };

        conn.execute(
            "UPDATE merchant_billing 
             SET prepaid_wallet_balance = prepaid_wallet_balance - ?1,
                 total_gross_sales = total_gross_sales + ?2,
                 total_platform_fees = total_platform_fees + ?3,
                 pending_cash_fees = pending_cash_fees + ?1,
                 updated_at = ?4
             WHERE merchant_id = 'merchant_default'",
            (balance_deduction, total_amount, platform_fee, &now),
        )?;

        conn.query_row(
            "SELECT merchant_id, store_name, business_type, fee_rate_percent, 
                    prepaid_wallet_balance, total_gross_sales, total_platform_fees, pending_cash_fees 
             FROM merchant_billing WHERE merchant_id = 'merchant_default'",
            [],
            |row| {
                Ok(MerchantBillingInfo {
                    merchant_id: row.get(0)?,
                    store_name: row.get(1)?,
                    business_type: row.get(2)?,
                    fee_rate_percent: row.get(3)?,
                    prepaid_wallet_balance: row.get(4)?,
                    total_gross_sales: row.get(5)?,
                    total_platform_fees: row.get(6)?,
                    pending_cash_fees: row.get(7)?,
                })
            },
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::db::schema::initialize_database;

    #[test]
    fn test_fee_calculation() {
        let (fee, net) = FeeEngine::calculate_fee(100.0, 2.0);
        assert_eq!(fee, 2.0);
        assert_eq!(net, 98.0);

        let (fee2, net2) = FeeEngine::calculate_fee(250.50, 2.0);
        assert_eq!(fee2, 5.01);
        assert_eq!(net2, 245.49);
    }

    #[test]
    fn test_tx_hash_chaining() {
        let genesis = "0000000000000000000000000000000000000000000000000000000000000000";
        let h1 = FeeEngine::compute_tx_hash(genesis, "REC-001", "cashier_1", 50.0, "cash", "2026-11-01T10:00:00Z");
        let h2 = FeeEngine::compute_tx_hash(&h1, "REC-002", "cashier_1", 100.0, "momo", "2026-11-01T10:05:00Z");

        assert_ne!(h1, genesis);
        assert_ne!(h2, h1);
        assert_eq!(h1.len(), 64);
        assert_eq!(h2.len(), 64);
    }

    #[test]
    fn test_database_init_and_billing() {
        let conn = Connection::open_in_memory().unwrap();
        initialize_database(&conn).unwrap();

        // Initial wallet starts with 500.0
        let billing_before = conn.query_row(
            "SELECT prepaid_wallet_balance FROM merchant_billing WHERE merchant_id = 'merchant_default'",
            [],
            |r| r.get::<_, f64>(0),
        ).unwrap();
        assert_eq!(billing_before, 500.0);

        // Process a cash sale of 200 GHS -> fee = 4.0 GHS, balance becomes 496.0 GHS
        let (fee, _) = FeeEngine::calculate_fee(200.0, 2.0);
        let updated = FeeEngine::process_merchant_billing(&conn, 200.0, fee, "cash").unwrap();

        assert_eq!(updated.prepaid_wallet_balance, 496.0);
        assert_eq!(updated.total_gross_sales, 200.0);
        assert_eq!(updated.total_platform_fees, 4.0);
        assert_eq!(updated.pending_cash_fees, 4.0);
    }
}
