import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "electric" | "midnight" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon,
  iconPosition = "right",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    // Orange for key CTAs
    primary:
      "bg-[#FF6B2C] text-white hover:bg-[#E85819] shadow-sm hover:shadow-md hover:shadow-[#FF6B2C]/20 focus-visible:outline-[#FF6B2C]",
    // Electric blue for interactive actions & navigation
    electric:
      "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm hover:shadow-md hover:shadow-[#2563EB]/25 focus-visible:outline-[#2563EB]",
    // Midnight blue for structural, strong elements
    midnight:
      "bg-[#102A56] text-white hover:bg-[#1A3D78] shadow-sm hover:shadow-md focus-visible:outline-[#102A56]",
    // Outline with midnight or slate border
    outline:
      "border border-slate-300 text-[#102A56] bg-white hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-[#2563EB]",
    // Subtle ghost button
    ghost:
      "text-slate-700 hover:text-[#102A56] hover:bg-slate-100/80 focus-visible:outline-[#2563EB]",
    // Clean white button for dark backgrounds
    white:
      "bg-white text-[#102A56] hover:bg-slate-50 shadow-sm hover:shadow focus-visible:outline-white",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && iconPosition === "left" && !isLoading && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && !isLoading && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}
