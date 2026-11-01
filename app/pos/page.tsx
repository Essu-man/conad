"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  ShoppingCart, Search, Barcode, Plus, Trash2, Printer, 
  CreditCard, Smartphone, Banknote, ShieldCheck, RefreshCw, 
  Store, User, Settings, CheckCircle, AlertCircle, ArrowRight
} from "lucide-react"
import { TauriPOS, RustProduct, RustSaleRecord, MerchantBillingInfo } from "@/lib/tauri-bridge"

// Generic starter templates for new merchants
const DEMO_SUPERMARKET_CATALOG: RustProduct[] = [
  { id: "p1", barcode: "01111001", name: "Whole Milk 1L", category: "Dairy", price: 28.0, cost_price: 22.0, stock_quantity: 45, unit: "bottle", min_stock_alert: 10, is_active: true, updated_at: "" },
  { id: "p2", barcode: "01111002", name: "Sliced Sandwich Bread", category: "Bakery", price: 18.5, cost_price: 14.0, stock_quantity: 30, unit: "loaf", min_stock_alert: 5, is_active: true, updated_at: "" },
  { id: "p3", barcode: "01111003", name: "Eggs (Crate of 30)", category: "Dairy", price: 75.0, cost_price: 65.0, stock_quantity: 20, unit: "crate", min_stock_alert: 5, is_active: true, updated_at: "" },
  { id: "p4", barcode: "01111004", name: "Jasmine Rice 5kg", category: "Grains", price: 145.0, cost_price: 120.0, stock_quantity: 25, unit: "bag", min_stock_alert: 8, is_active: true, updated_at: "" },
  { id: "p5", barcode: "01111005", name: "Sunflower Cooking Oil 1L", category: "Cooking", price: 42.0, cost_price: 35.0, stock_quantity: 40, unit: "bottle", min_stock_alert: 10, is_active: true, updated_at: "" },
  { id: "p6", barcode: "01111006", name: "Mineral Water Pack (12x500ml)", category: "Beverages", price: 32.0, cost_price: 25.0, stock_quantity: 50, unit: "pack", min_stock_alert: 15, is_active: true, updated_at: "" },
  { id: "p7", barcode: "01111007", name: "Instant Coffee 200g", category: "Beverages", price: 55.0, cost_price: 45.0, stock_quantity: 18, unit: "jar", min_stock_alert: 5, is_active: true, updated_at: "" },
  { id: "p8", barcode: "01111008", name: "Spaghetti Pasta 500g", category: "Grains", price: 12.0, cost_price: 9.0, stock_quantity: 60, unit: "pack", min_stock_alert: 12, is_active: true, updated_at: "" },
  { id: "p9", barcode: "01111009", name: "Corn Flakes Cereal 500g", category: "Breakfast", price: 38.0, cost_price: 30.0, stock_quantity: 22, unit: "box", min_stock_alert: 6, is_active: true, updated_at: "" },
  { id: "p10", barcode: "01111010", name: "Tomato Paste Tin 400g", category: "Canned Goods", price: 14.0, cost_price: 10.5, stock_quantity: 80, unit: "can", min_stock_alert: 20, is_active: true, updated_at: "" },
]

interface CartItem {
  product: RustProduct
  quantity: number
  totalPrice: number
}

export default function ConadPOSPage() {
  const [storeName, setStoreName] = useState("Conad Retail Store")
  const [businessType, setBusinessType] = useState("Supermarket")
  const [currency, setCurrency] = useState("GHS")
  const [cashierName, setCashierName] = useState("Cashier 1")
  
  const [products, setProducts] = useState<RustProduct[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<CartItem[]>([])
  
  const [isDesktop, setIsDesktop] = useState(false)
  const [billing, setBilling] = useState<MerchantBillingInfo | null>(null)
  
  // Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [lastSaleReceipt, setLastSaleReceipt] = useState<RustSaleRecord | null>(null)
  
  // Checkout state
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "momo" | "card">("cash")
  const [cashTendered, setCashTendered] = useState("")
  
  // New product form
  const [newProdName, setNewProdName] = useState("")
  const [newProdBarcode, setNewProdBarcode] = useState("")
  const [newProdCategory, setNewProdCategory] = useState("General")
  const [newProdPrice, setNewProdPrice] = useState("")
  const [newProdCost, setNewProdCost] = useState("")
  const [newProdStock, setNewProdStock] = useState("")
  const [newProdUnit, setNewProdUnit] = useState("pcs")

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const desktopMode = TauriPOS.isDesktop()
    setIsDesktop(desktopMode)

    if (desktopMode) {
      loadProductsFromRust()
      loadBillingFromRust()
    } else {
      const savedProducts = localStorage.getItem("conad_pos_products")
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts))
        } catch {
          setProducts([])
        }
      }
      const savedStore = localStorage.getItem("conad_pos_store")
      if (savedStore) setStoreName(savedStore)
    }
  }, [])

  const loadProductsFromRust = async () => {
    try {
      const items = await TauriPOS.getProducts()
      setProducts(items)
    } catch (err) {
      console.error("Failed to load products from Rust:", err)
    }
  }

  const loadBillingFromRust = async () => {
    try {
      const info = await TauriPOS.getBillingInfo()
      if (info) {
        setBilling(info)
        setStoreName(info.store_name)
      }
    } catch (err) {
      console.error("Failed to load billing:", err)
    }
  }

  const handleLoadDemoCatalog = async () => {
    if (isDesktop) {
      await TauriPOS.bulkImportProducts(DEMO_SUPERMARKET_CATALOG)
      await loadProductsFromRust()
    } else {
      setProducts(DEMO_SUPERMARKET_CATALOG)
      localStorage.setItem("conad_pos_products", JSON.stringify(DEMO_SUPERMARKET_CATALOG))
    }
  }

  const handleClearCatalog = () => {
    if (confirm("Are you sure you want to clear your current product catalog?")) {
      setProducts([])
      if (!isDesktop) localStorage.removeItem("conad_pos_products")
    }
  }

  const handleAddToCart = (product: RustProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.product.price }
            : item
        )
      }
      return [...prev, { product, quantity: 1, totalPrice: product.price }]
    })
  }

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0
              ? { ...item, quantity: newQty, totalPrice: newQty * item.product.price }
              : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProdName || !newProdPrice) return

    const product: RustProduct = {
      id: "prod_" + Date.now(),
      barcode: newProdBarcode.trim() || "BC" + Math.floor(10000000 + Math.random() * 90000000),
      name: newProdName.trim(),
      category: newProdCategory.trim() || "General",
      price: parseFloat(newProdPrice) || 0,
      cost_price: parseFloat(newProdCost) || 0,
      stock_quantity: parseFloat(newProdStock) || 0,
      unit: newProdUnit.trim() || "pcs",
      min_stock_alert: 5,
      is_active: true,
      updated_at: new Date().toISOString(),
    }

    if (isDesktop) {
      await TauriPOS.upsertProduct(product)
      await loadProductsFromRust()
    } else {
      const updated = [...products, product]
      setProducts(updated)
      localStorage.setItem("conad_pos_products", JSON.stringify(updated))
    }

    setNewProdName("")
    setNewProdBarcode("")
    setNewProdPrice("")
    setNewProdCost("")
    setNewProdStock("")
    setIsAddProductOpen(false)
  }

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0)
  const platformFee = Math.round(subtotal * 0.02 * 100) / 100
  const netMerchant = subtotal - platformFee

  const handleProcessCheckout = async () => {
    if (cart.length === 0) return

    const saleItems = cart.map((item) => ({
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      total_price: item.totalPrice,
    }))

    const request = {
      cashier_id: "c_1",
      cashier_name: cashierName,
      items: saleItems,
      subtotal,
      tax_amount: 0,
      discount_amount: 0,
      total_amount: subtotal,
      payment_method: paymentMethod,
    }

    if (isDesktop) {
      try {
        const record = await TauriPOS.createSale(request)
        if (record) {
          setLastSaleReceipt(record)
          await loadBillingFromRust()
          await loadProductsFromRust()
        }
      } catch (err) {
        alert("Checkout failed: " + err)
        return
      }
    } else {
      const mockRecord: RustSaleRecord = {
        id: "tx_" + Date.now(),
        receipt_number: "REC-" + Date.now().toString().slice(-6),
        cashier_id: "c_1",
        cashier_name: cashierName,
        total_amount: subtotal,
        subtotal,
        tax_amount: 0,
        discount_amount: 0,
        payment_method: paymentMethod,
        platform_fee_percent: 2.0,
        platform_fee_amount: platformFee,
        net_merchant_amount: netMerchant,
        prev_tx_hash: "0000000000000000000000000000000000000000000000000000000000000000",
        tx_hash: "mock_hash_" + Date.now(),
        sync_status: "synced",
        created_at: new Date().toISOString(),
        items: saleItems,
      }
      setLastSaleReceipt(mockRecord)
    }

    setCart([])
    setIsCheckoutOpen(false)
  }

  const handlePrintReceipt = async () => {
    if (!lastSaleReceipt) return
    if (isDesktop) {
      await TauriPOS.printReceipt(lastSaleReceipt, {
        paper_width_mm: 80,
        store_name: storeName.toUpperCase(),
        address: "Ghana Store Location",
        phone: "+233 24 000 0000",
        footer_message: "Thank you for shopping with us!",
      })
      alert("Receipt sent to thermal printer!")
    } else {
      window.print()
    }
  }

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-slate-100 font-sans">
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30">
                C
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white">CONAD POS</span>
                <span className="ml-2 rounded bg-indigo-950 px-2 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-800">
                  {businessType}
                </span>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-800" />

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Store className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-white">{storeName}</span>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline ml-1"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs">
              <span className={`h-2 w-2 rounded-full ${isDesktop ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-slate-300">{isDesktop ? "Rust Desktop Engine (SQLite)" : "Web Preview Mode"}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-indigo-950/60 border border-indigo-900/80 px-3 py-1 text-xs">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <div>
                <span className="text-indigo-300 font-medium">Fee: 2.0%</span>
                <span className="text-slate-400 ml-2">Wallet: {currency} {billing ? billing.prepaid_wallet_balance.toFixed(2) : "500.00"}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-6 py-3">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Scan barcode or search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
            <button
              onClick={handleLoadDemoCatalog}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
            >
              Load Demo Catalog
            </button>
            {products.length > 0 && (
              <button
                onClick={handleClearCatalog}
                className="rounded-lg border border-rose-900/60 bg-rose-950/30 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/60"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-slate-800 bg-slate-950 px-6 py-2.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1 font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
              <Store className="h-12 w-12 stroke-[1.5] text-slate-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-300">Catalog is Empty</h3>
              <p className="max-w-md text-sm text-slate-400 mt-1 mb-4">
                This is a clean, private store environment. Add your own items or load a sample retail catalog to test.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Create Product
                </button>
                <button
                  onClick={handleLoadDemoCatalog}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
                >
                  Load Sample Catalog
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleAddToCart(p)}
                  className="group relative flex cursor-pointer flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                      {p.category}
                    </span>
                    <h4 className="font-semibold text-sm text-white line-clamp-2 mt-1">
                      {p.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                      #{p.barcode}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between border-t border-slate-900 pt-3">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">{currency}</span>{" "}
                      <span className="text-base font-bold text-white">{p.price.toFixed(2)}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">/{p.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex w-96 flex-col border-l border-slate-800 bg-slate-950">
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-indigo-400" />
            <span className="font-bold text-white">Current Order</span>
          </div>
          <span className="rounded-full bg-slate-900 border border-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
            {cart.reduce((s, i) => s + i.quantity, 0)} items
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
              <ShoppingCart className="h-10 w-10 text-slate-700 mb-2 stroke-[1.5]" />
              <p className="text-sm">Cart is empty</p>
              <p className="text-xs text-slate-600 mt-1">Scan a barcode or click a product</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 p-3"
              >
                <div className="flex-1 pr-2">
                  <h5 className="font-medium text-xs text-white line-clamp-1">{item.product.name}</h5>
                  <span className="text-[11px] text-slate-400">
                    {currency} {item.product.price.toFixed(2)} x {item.quantity}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded border border-slate-700 bg-slate-950">
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, -1)}
                      className="px-2 py-0.5 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, 1)}
                      className="px-2 py-0.5 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-bold text-white w-14 text-right">
                    {currency} {item.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-800 bg-slate-900/40 p-5 space-y-3">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Subtotal</span>
            <span>{currency} {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs text-indigo-400 font-medium bg-indigo-950/40 rounded px-2.5 py-1.5 border border-indigo-900/40">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Platform Fee (2.0%)
            </span>
            <span>{currency} {platformFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-slate-800">
            <span>Total Payable</span>
            <span className="text-indigo-400">{currency} {subtotal.toFixed(2)}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-sm text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Charge {currency} {subtotal.toFixed(2)}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Select Payment Method</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Total Amount: <span className="font-bold text-white">{currency} {subtotal.toFixed(2)}</span>
            </p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { id: "cash", label: "Cash", icon: Banknote },
                { id: "momo", label: "Mobile Money", icon: Smartphone },
                { id: "card", label: "Card", icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon
                const active = paymentMethod === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-semibold transition-all ${
                      active
                        ? "border-indigo-500 bg-indigo-950/60 text-white"
                        : "border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {m.label}
                  </button>
                )
              })}
            </div>

            {paymentMethod === "cash" && (
              <div className="mb-5 space-y-2">
                <label className="text-xs text-slate-400">Cash Tendered ({currency})</label>
                <input
                  type="number"
                  placeholder={subtotal.toFixed(2)}
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white font-mono text-base focus:border-indigo-500 focus:outline-none"
                />
                {parseFloat(cashTendered) >= subtotal && (
                  <div className="flex justify-between text-xs text-emerald-400 pt-1 font-semibold">
                    <span>Change:</span>
                    <span>{currency} {(parseFloat(cashTendered) - subtotal).toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessCheckout}
                className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      )}

      {lastSaleReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl text-center">
            <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">Payment Received!</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Receipt #{lastSaleReceipt.receipt_number}
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left font-mono text-xs space-y-2 mb-5">
              <div className="flex justify-between text-slate-300">
                <span>Total Amount:</span>
                <span className="font-bold text-white">{currency} {lastSaleReceipt.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Method:</span>
                <span className="uppercase">{lastSaleReceipt.payment_method}</span>
              </div>
              <div className="flex justify-between text-indigo-400">
                <span>Platform Fee (2%):</span>
                <span>{currency} {lastSaleReceipt.platform_fee_amount.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 text-[10px] text-slate-500 truncate">
                Hash: {lastSaleReceipt.tx_hash.slice(0, 24)}...
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setLastSaleReceipt(null)}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={handlePrintReceipt}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <form onSubmit={handleCreateProduct} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Add Product to Catalog</h3>
            
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-slate-400">Product Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sugar 1kg"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Barcode / SKU</label>
                  <input
                    type="text"
                    placeholder="Auto-generated if empty"
                    value={newProdBarcode}
                    onChange={(e) => setNewProdBarcode(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Groceries"
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Selling Price *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Cost Price</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProdCost}
                    onChange={(e) => setNewProdCost(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Stock Qty</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Store Profile & Settings</h3>
            <p className="text-xs text-slate-400 mb-4">Customize your store identity and POS configuration.</p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-slate-400">Store / Business Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Business Category</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Supermarket">Supermarket</option>
                    <option value="Grocery Store">Grocery Store</option>
                    <option value="Retail & Boutique">Retail & Boutique</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Hardware">Hardware Store</option>
                    <option value="General Enterprise">General Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="GHS">GHS (₵)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="NGN">NGN (₦)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">Active Cashier Name</label>
                <input
                  type="text"
                  value={cashierName}
                  onChange={(e) => setCashierName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!isDesktop) localStorage.setItem("conad_pos_store", storeName)
                setIsSettingsOpen(false)
              }}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
