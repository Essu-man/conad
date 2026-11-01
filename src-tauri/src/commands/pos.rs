use tauri::State;
use crate::db::AppState;
use crate::db::models::{CreateSaleRequest, SaleRecord, MerchantBillingInfo};
use crate::billing::FeeEngine;

#[tauri::command]
pub fn create_sale(
    state: State<'_, AppState>,
    request: CreateSaleRequest,
) -> Result<SaleRecord, String> {
    let mut conn = state.db.lock().map_err(|e| e.to_string())?;
    let now = chrono::Utc::now().to_rfc3339();
    let tx_id = format!("tx_{}", chrono::Utc::now().timestamp_millis());
    let receipt_number = format!("REC-{}-{}", chrono::Utc::now().format("%Y%m%d"), &tx_id[tx_id.len() - 4..]);

    // 1. Calculate 2% platform fee
    let (platform_fee, net_merchant) = FeeEngine::calculate_fee(request.total_amount, FeeEngine::DEFAULT_FEE_PERCENT);

    // 2. Cryptographic ledger chaining
    let prev_hash = FeeEngine::get_last_tx_hash(&conn);
    let current_hash = FeeEngine::compute_tx_hash(
        &prev_hash,
        &receipt_number,
        &request.cashier_id,
        request.total_amount,
        &request.payment_method,
        &now,
    );

    // 3. Execute atomic transaction in SQLite
    let tx = conn.transaction().map_err(|e| e.to_string())?;

    tx.execute(
        "INSERT INTO sales (
            id, receipt_number, cashier_id, cashier_name, total_amount, subtotal, 
            tax_amount, discount_amount, payment_method, payment_reference, 
            platform_fee_percent, platform_fee_amount, net_merchant_amount, 
            prev_tx_hash, tx_hash, sync_status, created_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, 'pending', ?16)",
        (
            &tx_id,
            &receipt_number,
            &request.cashier_id,
            &request.cashier_name,
            request.total_amount,
            request.subtotal,
            request.tax_amount,
            request.discount_amount,
            &request.payment_method,
            &request.payment_reference,
            FeeEngine::DEFAULT_FEE_PERCENT,
            platform_fee,
            net_merchant,
            &prev_hash,
            &current_hash,
            &now,
        ),
    ).map_err(|e| format!("Failed to record sale: {}", e))?;

    // Insert line items and reduce stock
    for item in &request.items {
        let item_id = format!("item_{}_{}", tx_id, &item.product_id);
        tx.execute(
            "INSERT INTO sale_items (id, sale_id, product_id, product_name, quantity, unit_price, total_price)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            (
                &item_id,
                &tx_id,
                &item.product_id,
                &item.product_name,
                item.quantity,
                item.unit_price,
                item.total_price,
            ),
        ).map_err(|e| format!("Failed to record sale item: {}", e))?;

        // Deduct inventory stock quantity
        tx.execute(
            "UPDATE products 
             SET stock_quantity = stock_quantity - ?1, updated_at = ?2 
             WHERE id = ?3",
            (item.quantity, &now, &item.product_id),
        ).map_err(|e| format!("Failed to update product stock: {}", e))?;
    }

    // Process merchant balance adjustment
    let balance_deduction = if request.payment_method.to_lowercase() == "cash" {
        platform_fee
    } else {
        0.0
    };

    tx.execute(
        "UPDATE merchant_billing 
         SET prepaid_wallet_balance = prepaid_wallet_balance - ?1,
             total_gross_sales = total_gross_sales + ?2,
             total_platform_fees = total_platform_fees + ?3,
             pending_cash_fees = pending_cash_fees + ?1,
             updated_at = ?4
         WHERE merchant_id = 'merchant_default'",
        (balance_deduction, request.total_amount, platform_fee, &now),
    ).map_err(|e| format!("Failed to update billing: {}", e))?;

    tx.commit().map_err(|e| e.to_string())?;

    Ok(SaleRecord {
        id: tx_id,
        receipt_number,
        cashier_id: request.cashier_id,
        cashier_name: request.cashier_name,
        total_amount: request.total_amount,
        subtotal: request.subtotal,
        tax_amount: request.tax_amount,
        discount_amount: request.discount_amount,
        payment_method: request.payment_method,
        payment_reference: request.payment_reference,
        platform_fee_percent: FeeEngine::DEFAULT_FEE_PERCENT,
        platform_fee_amount: platform_fee,
        net_merchant_amount: net_merchant,
        prev_tx_hash: prev_hash,
        tx_hash: current_hash,
        sync_status: "pending".to_string(),
        created_at: now,
        items: request.items,
    })
}

#[tauri::command]
pub fn get_sales(
    state: State<'_, AppState>,
    limit: i64,
) -> Result<Vec<SaleRecord>, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(
        "SELECT id, receipt_number, cashier_id, cashier_name, total_amount, subtotal, 
                tax_amount, discount_amount, payment_method, payment_reference, 
                platform_fee_percent, platform_fee_amount, net_merchant_amount, 
                prev_tx_hash, tx_hash, sync_status, created_at
         FROM sales ORDER BY created_at DESC LIMIT ?1"
    ).map_err(|e| e.to_string())?;

    let sales_iter = stmt.query_map([limit], |row| {
        Ok(SaleRecord {
            id: row.get(0)?,
            receipt_number: row.get(1)?,
            cashier_id: row.get(2)?,
            cashier_name: row.get(3)?,
            total_amount: row.get(4)?,
            subtotal: row.get(5)?,
            tax_amount: row.get(6)?,
            discount_amount: row.get(7)?,
            payment_method: row.get(8)?,
            payment_reference: row.get(9)?,
            platform_fee_percent: row.get(10)?,
            platform_fee_amount: row.get(11)?,
            net_merchant_amount: row.get(12)?,
            prev_tx_hash: row.get(13)?,
            tx_hash: row.get(14)?,
            sync_status: row.get(15)?,
            created_at: row.get(16)?,
            items: Vec::new(),
        })
    }).map_err(|e| e.to_string())?;

    let mut records = Vec::new();
    for sale in sales_iter {
        records.push(sale.map_err(|e| e.to_string())?);
    }

    Ok(records)
}

#[tauri::command]
pub fn get_billing_info(state: State<'_, AppState>) -> Result<MerchantBillingInfo, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
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
    ).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn top_up_wallet(state: State<'_, AppState>, amount: f64) -> Result<MerchantBillingInfo, String> {
    {
        let conn = state.db.lock().map_err(|e| e.to_string())?;
        let now = chrono::Utc::now().to_rfc3339();
        conn.execute(
            "UPDATE merchant_billing 
             SET prepaid_wallet_balance = prepaid_wallet_balance + ?1, updated_at = ?2
             WHERE merchant_id = 'merchant_default'",
            (amount, &now),
        ).map_err(|e| e.to_string())?;
    }

    get_billing_info(state)
}
