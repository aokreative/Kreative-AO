"use client";

import Image from "next/image";
import { useState } from "react";
import { Ridges } from "./graphics/ridges";
import { IMAGERY_MANIFEST } from "@/content/imagery";

export function Frame({
  src,
  alt,
  priority = false,
  fallback = true,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  fallback?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const aspectClass = IMAGERY_MANIFEST[src]?.aspect || "";

  return (
    <div className={`img-treat relative overflow-hidden bg-surface-2 ${aspectClass} ${className}`}>
      {fallback && (
        <div className="absolute inset-0 flex items-center justify-center text-orange-lift/20">
          <Ridges size={600} />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
