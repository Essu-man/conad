/**
 * Weskinah POS Tauri Desktop Bridge
 * Provides high-speed typed IPC calls to the native Rust backend when running
 * in the desktop application, with graceful fallbacks for web mode.
 */

export interface RustProduct {
  id: string
  barcode: string
  name: string
  category: string
  price: number
  cost_price: number
  stock_quantity: number
  unit: string
  min_stock_alert: number
  is_active: boolean
  updated_at: string
}

export interface RustSaleItem {
  id?: string
  sale_id?: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface CreateSaleRequest {
  cashier_id: string
  cashier_name: string
  items: RustSaleItem[]
  subtotal: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  payment_method: 'cash' | 'card' | 'momo' | string
  payment_reference?: string
  customer_id?: string
  customer_name?: string
}

export interface RustSaleRecord {
  id: string
  receipt_number: string
  cashier_id: string
  cashier_name: string
  total_amount: number
  subtotal: number
  tax_amount: number
  discount_amount: number
  payment_method: string
  payment_reference?: string
  platform_fee_percent: number // 2.0%
  platform_fee_amount: number
  net_merchant_amount: number
  prev_tx_hash: string
  tx_hash: string
  sync_status: 'pending' | 'synced'
  created_at: string
  items: RustSaleItem[]
}

export interface MerchantBillingInfo {
  merchant_id: string
  store_name: string
  business_type: string
  fee_rate_percent: number
  prepaid_wallet_balance: number
  total_gross_sales: number
  total_platform_fees: number
  pending_cash_fees: number
}

export interface PrinterConfig {
  paper_width_mm: 58 | 80
  store_name: string
  address: string
  phone: string
  footer_message: string
}

export interface PrintReceiptResult {
  success: boolean
  formatted_receipt: string
  message: string
}

export const isTauriEnvironment = (): boolean => {
  if (typeof window === 'undefined') return false
  return '__TAURI_INTERNALS__' in window || '__TAURI__' in window
}

/**
 * Execute an IPC command to the native Rust engine with error handling
 */
async function invokeTauri<T>(cmd: string, args?: Record<string, any>): Promise<T | null> {
  if (!isTauriEnvironment()) {
    console.warn(`[Tauri Bridge] Not running in Tauri desktop environment. Skipping command: ${cmd}`)
    return null
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    return await invoke<T>(cmd, args)
  } catch (error) {
    console.error(`[Tauri Bridge] Error invoking command "${cmd}":`, error)
    throw error
  }
}

export const TauriPOS = {
  isDesktop: isTauriEnvironment,

  // --- POS & Transaction Operations ---
  async createSale(request: CreateSaleRequest): Promise<RustSaleRecord | null> {
    return await invokeTauri<RustSaleRecord>('create_sale', { request })
  },

  async getSales(limit: number = 50): Promise<RustSaleRecord[]> {
    const res = await invokeTauri<RustSaleRecord[]>('get_sales', { limit })
    return res || []
  },

  async getBillingInfo(): Promise<MerchantBillingInfo | null> {
    return await invokeTauri<MerchantBillingInfo>('get_billing_info')
  },

  async topUpWallet(amount: number): Promise<MerchantBillingInfo | null> {
    return await invokeTauri<MerchantBillingInfo>('top_up_wallet', { amount })
  },

  // --- Inventory & Barcode Operations ---
  async getProducts(): Promise<RustProduct[]> {
    const res = await invokeTauri<RustProduct[]>('get_products')
    return res || []
  },

  async lookupBarcode(barcode: string): Promise<RustProduct | null> {
    return await invokeTauri<RustProduct | null>('lookup_barcode', { barcode })
  },

  async upsertProduct(product: RustProduct): Promise<RustProduct | null> {
    return await invokeTauri<RustProduct>('upsert_product', { product })
  },

  async bulkImportProducts(products: RustProduct[]): Promise<number> {
    const count = await invokeTauri<number>('bulk_import_products', { products })
    return count || 0
  },

  // --- Hardware & Thermal Receipt Printing ---
  async printReceipt(sale: RustSaleRecord, config?: PrinterConfig): Promise<PrintReceiptResult | null> {
    return await invokeTauri<PrintReceiptResult>('format_and_print_receipt', { sale, config })
  },
}
