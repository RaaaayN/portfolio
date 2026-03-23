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

// Augmenter les tailles rendues pour la meilleure netteté ("retina ready")
const sizeToTailwind = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
  "2xl": "w-48 h-48",
  "3xl": "w-64 h-64",
};
// Utilisation d'une densité 3x pour l'affichage avec screens retina ou hauts DPI
const sizeToPixel = {
  sm: 144,    // 3x pour la netteté pixel-perfect
  md: 240,
  lg: 288,
  xl: 384,
  "2xl": 576,
  "3xl": 768,
};

// Placeholder blur inline (data URI 1x1 gris) — évite le 404 sur fichier externe
const DEFAULT_BLUR_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

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

  // En cas d'erreur: icône claire, belle intégration
  if (hasError) {
    return (
      <div className={`${sizeToTailwind[size]} ${rounded ? "rounded-full" : "rounded-lg"} bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-2xl" aria-label="Aperçu manquant">📷</span>
      </div>
    );
  }

  return (
    <div className={`relative ${sizeToTailwind[size]} ${rounded ? "rounded-full" : "rounded-lg"} ${shadow ? "shadow-md" : ""} overflow-hidden bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={sizeToPixel[size]}
        height={sizeToPixel[size]}
        sizes={`${sizeToPixel[size]}px`}
        quality={100}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? "opacity-0 scale-110 blur-sm grayscale" : "opacity-100 scale-100 blur-0 grayscale-0"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        priority={false}
        unoptimized={false}
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR_URL}
        style={{
          imageRendering: "auto", // Supprimez "pixelated" pour qualité native anti-aliasé
        }}
        loading="eager"
        draggable={false}
      />
      {/* Un vrai fond d'attente élégant, pour améliorer la prévisualisation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 animate-pulse z-10">
          <span className="text-gray-400 text-2xl">⏳</span>
        </div>
      )}
    </div>
  );
}
