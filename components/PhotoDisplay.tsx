"use client";

import Image from "next/image";
import { useState } from "react";

interface PhotoDisplayProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  rounded?: boolean;
  shadow?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
  "2xl": "w-48 h-48",
  "3xl": "w-64 h-64",
};

export function PhotoDisplay({ 
  src, 
  alt, 
  className = "", 
  size = "md",
  rounded = true,
  shadow = true
}: PhotoDisplayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${sizeClasses[size]} ${rounded ? "rounded-full" : "rounded-lg"} bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-xs">📷</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${rounded ? "rounded-full" : "rounded-lg"} ${shadow ? "shadow-md" : ""} overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={size === "sm" ? 48 : size === "md" ? 80 : size === "lg" ? 96 : size === "xl" ? 128 : size === "2xl" ? 192 : 256}
        height={size === "sm" ? 48 : size === "md" ? 80 : size === "lg" ? 96 : size === "xl" ? 128 : size === "2xl" ? 192 : 256}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-xs">⏳</span>
        </div>
      )}
    </div>
  );
}
