use rusqlite::{Connection, Result};

pub fn initialize_database(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            barcode TEXT UNIQUE,
            name TEXT NOT NULL,
            category TEXT NOT NULL DEFAULT 'General',
            price REAL NOT NULL DEFAULT 0.0,
            cost_price REAL NOT NULL DEFAULT 0.0,
            stock_quantity REAL NOT NULL DEFAULT 0.0,
            unit TEXT NOT NULL DEFAULT 'pcs',
            min_stock_alert REAL NOT NULL DEFAULT 5.0,
            is_active INTEGER NOT NULL DEFAULT 1,
            updated_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
        CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

        CREATE TABLE IF NOT EXISTS sales (
            id TEXT PRIMARY KEY,
            receipt_number TEXT UNIQUE NOT NULL,
            cashier_id TEXT NOT NULL,
            cashier_name TEXT NOT NULL,
            total_amount REAL NOT NULL,
            subtotal REAL NOT NULL,
            tax_amount REAL NOT NULL DEFAULT 0.0,
            discount_amount REAL NOT NULL DEFAULT 0.0,
            payment_method TEXT NOT NULL,
            payment_reference TEXT,
            platform_fee_percent REAL NOT NULL DEFAULT 2.0,
            platform_fee_amount REAL NOT NULL DEFAULT 0.0,
            net_merchant_amount REAL NOT NULL DEFAULT 0.0,
            prev_tx_hash TEXT NOT NULL,
            tx_hash TEXT NOT NULL,
            sync_status TEXT NOT NULL DEFAULT 'pending',
            created_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);
        CREATE INDEX IF NOT EXISTS idx_sales_sync ON sales(sync_status);

        CREATE TABLE IF NOT EXISTS sale_items (
            id TEXT PRIMARY KEY,
            sale_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            product_name TEXT NOT NULL,
            quantity REAL NOT NULL,
            unit_price REAL NOT NULL,
            total_price REAL NOT NULL,
            FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_sale_items_sale ON sale_items(sale_id);

        CREATE TABLE IF NOT EXISTS merchant_billing (
            merchant_id TEXT PRIMARY KEY,
            store_name TEXT NOT NULL,
            business_type TEXT NOT NULL DEFAULT 'supermarket',
            fee_rate_percent REAL NOT NULL DEFAULT 2.0,
            prepaid_wallet_balance REAL NOT NULL DEFAULT 100.0,
            total_gross_sales REAL NOT NULL DEFAULT 0.0,
            total_platform_fees REAL NOT NULL DEFAULT 0.0,
            pending_cash_fees REAL NOT NULL DEFAULT 0.0,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS cashier_shifts (
            id TEXT PRIMARY KEY,
            cashier_id TEXT NOT NULL,
            opening_float REAL NOT NULL DEFAULT 0.0,
            total_cash_sales REAL NOT NULL DEFAULT 0.0,
            total_digital_sales REAL NOT NULL DEFAULT 0.0,
            closing_cash_counted REAL,
            status TEXT NOT NULL DEFAULT 'open',
            started_at TEXT NOT NULL,
            closed_at TEXT
        );

        CREATE TABLE IF NOT EXISTS sync_queue (
            id TEXT PRIMARY KEY,
            entity_type TEXT NOT NULL,
            action TEXT NOT NULL,
            payload TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TEXT NOT NULL
        );
        "
    )?;

    // Ensure default merchant record exists if not present
    let count: i64 = conn.query_row(
        "SELECT COUNT(*) FROM merchant_billing",
        [],
        |row| row.get(0),
    ).unwrap_or(0);

    if count == 0 {
        let now = chrono::Utc::now().to_rfc3339();
        conn.execute(
            "INSERT INTO merchant_billing (merchant_id, store_name, business_type, fee_rate_percent, prepaid_wallet_balance, total_gross_sales, total_platform_fees, pending_cash_fees, updated_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
            (
                "merchant_default",
                "Conad POS Retail Store",
                "supermarket",
                2.0,
                500.0, // Default starter promotional credit balance
                0.0,
                0.0,
                0.0,
                now,
            ),
        )?;
    }

    Ok(())
}
