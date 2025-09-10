"use client";

import Image from "next/image";
import { useState } from "react";

interface PhotoDisplayProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
  shadow?: boolean;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-20 h-20",
  xl: "w-32 h-32",
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
        width={size === "sm" ? 40 : size === "md" ? 64 : size === "lg" ? 80 : 128}
        height={size === "sm" ? 40 : size === "md" ? 64 : size === "lg" ? 80 : 128}
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
