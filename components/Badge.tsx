import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = ""
}: BadgeProps) {
  const baseClasses = "inline-flex items-center font-medium rounded-full font-mono";

  const variantClasses = {
    default: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    secondary: "bg-white/[0.08] text-slate-300 border border-white/10",
    success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    error: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
