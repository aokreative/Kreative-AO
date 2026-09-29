import Link from "next/link";

export function Logo({ 
  onDark = false,
  width,
  priority
}: { 
  onDark?: boolean;
  width?: number;
  priority?: boolean;
}) {
  const textColor = onDark ? "#F5F0E6" : "#0D1B35";
  
  return (
    <svg 
      viewBox="0 0 240 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={width ? "h-auto" : "h-[36px] w-auto"}
      style={width ? { width: `${width}px` } : undefined}
    >
      <polygon points="14,38 22,14 30,38" fill="none" stroke="#C8A05A" strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="17" y1="30" x2="27" y2="30" stroke="#C8A05A" strokeWidth="1.8"/>
      <circle cx="36" cy="28" r="12" fill="none" stroke="#C8A05A" strokeWidth="1.8"/>
      <text x="56" y="24" fontFamily="var(--font-cormorant), Georgia, serif" fontSize="21" fontWeight="500" fill={textColor} letterSpacing="-0.5">A&amp;O</text>
      <text x="57" y="40" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="8.5" fontWeight="400" fill={textColor} letterSpacing="3.2">KREATIVE</text>
      <text x="125" y="40" fontFamily="var(--font-dm-sans), system-ui, sans-serif" fontSize="7" fontWeight="300" fill="#C8A05A" letterSpacing="1.5">AURA</text>
    </svg>
  );
}

export function LogoLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="A&O Kreative — home"
    >
      <Logo onDark={onDark} />
    </Link>
  );
}
