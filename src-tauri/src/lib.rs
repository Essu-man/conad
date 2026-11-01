pub mod db;
pub mod billing;
pub mod commands;

use std::sync::Mutex;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            // Resolve persistent app data directory for SQLite database
            let app_dir = app
                .path()
                .app_data_dir()
                .map_err(|e| Box::<dyn std::error::Error>::from(e.to_string()))?;

            std::fs::create_dir_all(&app_dir)
                .map_err(|e| Box::<dyn std::error::Error>::from(e.to_string()))?;

            let db_path = app_dir.join("conad_pos.db");
            log::info!("Opening SQLite database at: {:?}", db_path);

            let conn = rusqlite::Connection::open(db_path)
                .map_err(|e| Box::<dyn std::error::Error>::from(e.to_string()))?;

            db::schema::initialize_database(&conn)
                .map_err(|e| Box::<dyn std::error::Error>::from(e.to_string()))?;

            app.manage(db::AppState {
                db: Mutex::new(conn),
            });

            log::info!("Conad POS Rust engine initialized successfully.");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::pos::create_sale,
            commands::pos::get_sales,
            commands::pos::get_billing_info,
            commands::pos::top_up_wallet,
            commands::inventory::get_products,
            commands::inventory::lookup_barcode,
            commands::inventory::upsert_product,
            commands::inventory::bulk_import_products,
            commands::hardware::format_and_print_receipt,
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
