import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#102A56",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Conad Tech | Intelligent Business Software & SaaS Solutions",
    template: "%s | Conad Tech",
  },
  description:
    "Conad Tech develops high-performance software products, including cloud POS systems, workflow automation, and enterprise business solutions that empower modern commerce.",
  keywords: [
    "Conad Tech",
    "SaaS software",
    "cloud POS",
    "business automation",
    "retail technology",
    "enterprise software",
  ],
  authors: [{ name: "Conad Tech" }],
  creator: "Conad Tech",
  metadataBase: new URL("https://conadtech.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://conadtech.com",
    title: "Conad Tech | Technology That Moves Your Business Forward",
    description:
      "Intelligent software products and engineering services designed to simplify operations and unlock new possibilities.",
    siteName: "Conad Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conad Tech | Technology That Moves Your Business Forward",
    description:
      "Intelligent software products and engineering services designed to simplify operations and unlock new possibilities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#2563EB]/15 selection:text-[#102A56]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

