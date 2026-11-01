use tauri::State;
use crate::db::AppState;
use crate::db::models::Product;

#[tauri::command]
pub fn get_products(state: State<'_, AppState>) -> Result<Vec<Product>, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(
        "SELECT id, barcode, name, category, price, cost_price, stock_quantity, 
                unit, min_stock_alert, is_active, updated_at 
         FROM products WHERE is_active = 1 ORDER BY name ASC"
    ).map_err(|e| e.to_string())?;

    let product_iter = stmt.query_map([], |row| {
        Ok(Product {
            id: row.get(0)?,
            barcode: row.get(1)?,
            name: row.get(2)?,
            category: row.get(3)?,
            price: row.get(4)?,
            cost_price: row.get(5)?,
            stock_quantity: row.get(6)?,
            unit: row.get(7)?,
            min_stock_alert: row.get(8)?,
            is_active: row.get::<_, i64>(9)? == 1,
            updated_at: row.get(10)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut list = Vec::new();
    for p in product_iter {
        list.push(p.map_err(|e| e.to_string())?);
    }
    Ok(list)
}

#[tauri::command]
pub fn lookup_barcode(state: State<'_, AppState>, barcode: String) -> Result<Option<Product>, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(
        "SELECT id, barcode, name, category, price, cost_price, stock_quantity, 
                unit, min_stock_alert, is_active, updated_at 
         FROM products WHERE barcode = ?1 AND is_active = 1 LIMIT 1"
    ).map_err(|e| e.to_string())?;

    let mut rows = stmt.query_map([barcode], |row| {
        Ok(Product {
            id: row.get(0)?,
            barcode: row.get(1)?,
            name: row.get(2)?,
            category: row.get(3)?,
            price: row.get(4)?,
            cost_price: row.get(5)?,
            stock_quantity: row.get(6)?,
            unit: row.get(7)?,
            min_stock_alert: row.get(8)?,
            is_active: row.get::<_, i64>(9)? == 1,
            updated_at: row.get(10)?,
        })
    }).map_err(|e| e.to_string())?;

    if let Some(first) = rows.next() {
        Ok(Some(first.map_err(|e| e.to_string())?))
    } else {
        Ok(None)
    }
}

#[tauri::command]
pub fn upsert_product(state: State<'_, AppState>, product: Product) -> Result<Product, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    let now = chrono::Utc::now().to_rfc3339();

    conn.execute(
        "INSERT INTO products (
            id, barcode, name, category, price, cost_price, stock_quantity, 
            unit, min_stock_alert, is_active, updated_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
        ON CONFLICT(id) DO UPDATE SET
            barcode = excluded.barcode,
            name = excluded.name,
            category = excluded.category,
            price = excluded.price,
            cost_price = excluded.cost_price,
            stock_quantity = excluded.stock_quantity,
            unit = excluded.unit,
            min_stock_alert = excluded.min_stock_alert,
            is_active = excluded.is_active,
            updated_at = excluded.updated_at",
        (
            &product.id,
            &product.barcode,
            &product.name,
            &product.category,
            product.price,
            product.cost_price,
            product.stock_quantity,
            &product.unit,
            product.min_stock_alert,
            if product.is_active { 1 } else { 0 },
            &now,
        ),
    ).map_err(|e| e.to_string())?;

    let mut saved = product;
    saved.updated_at = now;
    Ok(saved)
}

#[tauri::command]
pub fn bulk_import_products(state: State<'_, AppState>, products: Vec<Product>) -> Result<usize, String> {
    let mut conn = state.db.lock().map_err(|e| e.to_string())?;
    let now = chrono::Utc::now().to_rfc3339();
    let tx = conn.transaction().map_err(|e| e.to_string())?;

    let mut count = 0;
    for product in &products {
        tx.execute(
            "INSERT INTO products (
                id, barcode, name, category, price, cost_price, stock_quantity, 
                unit, min_stock_alert, is_active, updated_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
            ON CONFLICT(id) DO UPDATE SET
                barcode = excluded.barcode,
                name = excluded.name,
                category = excluded.category,
                price = excluded.price,
                cost_price = excluded.cost_price,
                stock_quantity = excluded.stock_quantity,
                unit = excluded.unit,
                min_stock_alert = excluded.min_stock_alert,
                is_active = excluded.is_active,
                updated_at = excluded.updated_at",
            (
                &product.id,
                &product.barcode,
                &product.name,
                &product.category,
                product.price,
                product.cost_price,
                product.stock_quantity,
                &product.unit,
                product.min_stock_alert,
                if product.is_active { 1 } else { 0 },
                &now,
            ),
        ).map_err(|e| e.to_string())?;
        count += 1;
    }

    tx.commit().map_err(|e| e.to_string())?;
    Ok(count)
}
