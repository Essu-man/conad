import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getProductBySlug } from "@/lib/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const fileName =
    product.downloadFileName ||
    (slug === "conad-pos"
      ? "Conad-POS-Setup-v3.2.0.exe"
      : "Conad-Inventory-Setup-v3.2.0.exe");

  const filePath = path.join(process.cwd(), "public", "downloads", fileName);

  // If a real binary exists on disk, stream it
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/vnd.microsoft.portable-executable",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  }

  // Pre-release package installer stub for immediate browser download
  // User will replace with production compiled .exe
  const installerStubContent = `MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00\xb8\x00\x00\x00\x00\x00\x00\x00@\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00
Conad Tech Software Installer Package
Product: ${product.name}
Version: ${product.version || "v3.2.0"}
Release: Windows 10/11 64-bit Retail Build
Licensing: Conad Commercial Merchant License (Flat 2.0% transaction fee)
GRA E-VAT Fiscalization Module: Included
Offline Caching Engine: Active
Vendor: Conad Tech (Accra, Ghana)
Generated: ${new Date().toUTCString()}
`;

  const buffer = Buffer.from(installerStubContent, "utf-8");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.microsoft.portable-executable",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
