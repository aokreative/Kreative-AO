export function SvgFilters() {
  return (
    <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      {/* Variant F (Hero Full Strength) */}
      <filter id="grade-hero" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.012 0.196 0.500 0.822 1.000" />
          <feFuncG type="table" tableValues="0.012 0.178 0.470 0.780 0.976" />
          <feFuncB type="table" tableValues="0.072 0.280 0.548 0.828 1.000" />
        </feComponentTransfer>
      </filter>
      {/* 60% Strength of Variant F */}
      <filter id="grade-soft" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.007 0.218 0.500 0.793 1.000" />
          <feFuncG type="table" tableValues="0.007 0.207 0.482 0.768 0.986" />
          <feFuncB type="table" tableValues="0.043 0.268 0.529 0.797 1.000" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
