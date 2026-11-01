use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Product {
    pub id: String,
    pub barcode: String,
    pub name: String,
    pub category: String,
    pub price: f64,
    pub cost_price: f64,
    pub stock_quantity: f64,
    pub unit: String, // e.g. "pcs", "kg", "pack", "carton"
    pub min_stock_alert: f64,
    pub is_active: bool,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SaleItem {
    pub id: Option<String>,
    pub sale_id: Option<String>,
    pub product_id: String,
    pub product_name: String,
    pub quantity: f64,
    pub unit_price: f64,
    pub total_price: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateSaleRequest {
    pub cashier_id: String,
    pub cashier_name: String,
    pub items: Vec<SaleItem>,
    pub subtotal: f64,
    pub tax_amount: f64,
    pub discount_amount: f64,
    pub total_amount: f64,
    pub payment_method: String, // "cash", "card", "momo"
    pub payment_reference: Option<String>,
    pub customer_id: Option<String>,
    pub customer_name: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SaleRecord {
    pub id: String,
    pub receipt_number: String,
    pub cashier_id: String,
    pub cashier_name: String,
    pub total_amount: f64,
    pub subtotal: f64,
    pub tax_amount: f64,
    pub discount_amount: f64,
    pub payment_method: String,
    pub payment_reference: Option<String>,
    pub platform_fee_percent: f64, // 2.0%
    pub platform_fee_amount: f64,  // total_amount * 0.02
    pub net_merchant_amount: f64,  // total_amount - platform_fee
    pub prev_tx_hash: String,
    pub tx_hash: String,
    pub sync_status: String,       // "pending", "synced"
    pub created_at: String,
    pub items: Vec<SaleItem>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MerchantBillingInfo {
    pub merchant_id: String,
    pub store_name: String,
    pub business_type: String, // "supermarket", "retail", "pharmacy", "laundry", "company"
    pub fee_rate_percent: f64, // default 2.0
    pub prepaid_wallet_balance: f64,
    pub total_gross_sales: f64,
    pub total_platform_fees: f64,
    pub pending_cash_fees: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CashierShift {
    pub id: String,
    pub cashier_id: String,
    pub opening_float: f64,
    pub total_cash_sales: f64,
    pub total_digital_sales: f64,
    pub closing_cash_counted: Option<f64>,
    pub status: String, // "open", "closed"
    pub started_at: String,
    pub closed_at: Option<String>,
}
