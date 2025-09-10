import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-6",
        hover && "hover:shadow-md transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}