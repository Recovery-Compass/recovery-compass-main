import React from "react";

type Variant = "info" | "success" | "warning" | "error";

interface AlertProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * Minimal, accessible Alert component used as a placeholder to restore the missing module.
 * - Default export name matches imports like `import Alert from "../ui/alert"`.
 * - Uses simple utility class names (works with Tailwind or basic CSS).
 */
const variantClasses: Record<Variant, string> = {
  info: "bg-blue-50 text-blue-800 border-blue-200",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  error: "bg-red-50 text-red-800 border-red-200",
};

export default function Alert({
  children,
  variant = "info",
  className = "",
}: AlertProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`rounded-md border px-4 py-2 text-sm ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
