import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "orange" | "midnight" | "neutral" | "emerald";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "blue",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full tracking-wide";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs gap-1.5",
    md: "px-3.5 py-1 text-xs sm:text-sm gap-2",
  };

  const variantStyles = {
    blue: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60",
    orange: "bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]",
    midnight: "bg-[#102A56] text-white border border-[#1A3D78]",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
