import { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://conadtech.com";

  const staticRoutes = ["", "/products", "/services", "/docs", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: "2026-10-29",
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}${product.productPageUrl}`,
    lastModified: "2026-10-29",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
