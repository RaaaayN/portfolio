import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "violet" | "cyan" | "featured";
  hover?: boolean;
}

export function Card({ children, className, variant = "default", hover = false }: CardProps) {
  return (
    <div className={clsx(
      "glass rounded-2xl shadow-card p-8",
      hover && "hover:-translate-y-1 hover:border-white/[0.15] transition-all duration-300 cursor-pointer",
      variant === "violet" && "border-violet-500/30 shadow-glow-violet",
      variant === "cyan" && "border-cyan-accent/30 shadow-glow-cyan",
      variant === "featured" && "border-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.15)]",
      className
    )}>
      {children}
    </div>
  );
}
