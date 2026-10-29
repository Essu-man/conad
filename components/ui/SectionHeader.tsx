import React from "react";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "blue" | "orange" | "midnight" | "neutral" | "emerald";
  title: string;
  highlightText?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
  badgeVariant = "blue",
  title,
  highlightText,
  description,
  align = "center",
  className = "",
  dark = false,
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        isCentered ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {badge && (
        <div className={`mb-3.5 flex ${isCentered ? "justify-center" : "justify-start"}`}>
          <Badge variant={badgeVariant} size="sm">
            {badge}
          </Badge>
        </div>
      )}

      <h2
        className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
          dark ? "text-white" : "text-[#102A56]"
        }`}
      >
        {title}{" "}
        {highlightText && (
          <span className="text-[#2563EB] relative inline-block">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            dark ? "text-slate-300" : "text-[#64748B]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
