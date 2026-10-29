import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-white">
      <Container size="narrow">
        <div className="text-center space-y-6 max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            <span className="font-mono text-2xl font-black">404</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#102A56]">
            Page Not Found
          </h1>

          <p className="text-base text-[#64748B] leading-relaxed">
            The page you requested could not be located or may have been relocated.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href="/"
              variant="primary"
              size="md"
              icon={<Home className="w-4 h-4" />}
            >
              Return to Homepage
            </Button>
            <Button
              href="/products"
              variant="outline"
              size="md"
              icon={<Search className="w-4 h-4" />}
            >
              Browse Products
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
