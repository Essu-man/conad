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

  const { searchParams } = new URL(request.url);
  const format = (searchParams.get("format") || "exe").toLowerCase();
  const os = (searchParams.get("os") || (format === "dmg" ? "mac" : "windows")).toLowerCase();

  const baseName = slug === "conad-pos" ? "Conad-POS" : "Conad-Inventory";
  const version = product.version || "v3.2.0";

  let fileName: string;
  let contentType: string;

  if (os === "mac" || format === "dmg") {
    fileName = `${baseName}-${version}-mac.dmg`;
    contentType = "application/x-apple-diskimage";
  } else if (format === "msi") {
    fileName = `${baseName}-Setup-${version}.msi`;
    contentType = "application/x-msi";
  } else {
    fileName = `${baseName}-Setup-${version}.exe`;
    contentType = "application/vnd.microsoft.portable-executable";
  }

  const filePath = path.join(process.cwd(), "public", "downloads", fileName);

  // If the exact file exists on disk, stream it
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  }

  // Fallback to real compiled binary if available
  const defaultExePath = path.join(process.cwd(), "public", "downloads", `${baseName}-Setup-${version}.exe`);
  if (fs.existsSync(defaultExePath)) {
    const fileBuffer = fs.readFileSync(defaultExePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  }

  // Fallback package installer stub
  const stubContent = `Conad Tech Desktop Software Package
Product: ${product.name}
Version: ${version}
Target OS: ${os === "mac" ? "macOS (Apple Silicon & Intel)" : "Windows 10/11 64-bit"}
Package Type: ${format.toUpperCase()}
Licensing: Conad Commercial Merchant License (Flat 2.0% transaction fee)
Vendor: Conad Tech (Accra, Ghana)
Timestamp: ${new Date().toUTCString()}
`;

  const buffer = Buffer.from(stubContent, "utf-8");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
