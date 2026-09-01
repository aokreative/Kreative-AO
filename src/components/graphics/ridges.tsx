import React from "react";

export function Ridges({
  size = 400,
  className = "",
  draw = false,
}: {
  size?: number;
  className?: string;
  draw?: boolean;
}) {
  // 20 concentric contour paths, from outside in
  // We'll generate paths programmatically or use static paths. Since they are fingerprint ridges, 
  // I will generate concentric semi-circles/arcs for simplicity and aesthetics.
  // Wait, fingerprint is an arc with some variations. A set of pure arcs will do perfectly.
  const numPaths = 20;
  const paths = Array.from({ length: numPaths }).map((_, i) => {
    // scale from 1 (outer) to 0.1 (inner)
    const scale = 1 - (i * 0.9) / numPaths;
    const opacity = 0.08 + (0.35 - 0.08) * (i / (numPaths - 1));
    const r = 45 * scale;
    // We will draw an arc from 180 to 0 degrees, slightly varied
    return { r, opacity, index: i };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      <g transform="translate(50, 50)">
        {paths.map((p) => {
          // simple arc
          const d = `M ${-p.r} 0 A ${p.r} ${p.r} 0 1 1 ${p.r} 0`;
          const dash = Math.PI * p.r; // half circle length
          const delay = p.index * 40; // 40ms stagger
          const duration = 1000; // 1s total
          return (
            <path
              key={p.index}
              d={d}
              style={{
                opacity: p.opacity,
                strokeDasharray: draw ? `${dash * 2} ${dash * 2}` : "none",
                strokeDashoffset: draw ? dash * 2 : 0,
                animation: draw
                  ? `dashReveal ${duration}ms forwards ${delay}ms ease-out`
                  : "none",
              }}
            />
          );
        })}
      </g>
      {draw && (
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes dashReveal {
              to { stroke-dashoffset: 0; }
            }
          `
        }} />
      )}
    </svg>
  );
}
