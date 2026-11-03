import fs from "node:fs";
import path from "node:path";

/**
 * Opening animation: a fingerprint scan of the original A&O mark.
 * Pure CSS, so it plays and dismisses itself even before JavaScript loads,
 * and never blocks the page. Shown once per visit; skipped for visitors who
 * prefer reduced motion (see the inline script in layout.tsx).
 */
function markSvg() {
  const raw = fs.readFileSync(path.join(process.cwd(), "public/brand/aok-mark-reverse.svg"), "utf8");
  let i = 0;
  return raw
    .replace(' role="img" aria-label="A&amp;O Kreative"', ' aria-hidden="true" focusable="false"')
    .replace('<g fill="#EFE4CF">', '<g class="intro-ridges" fill="#EFE4CF">')
    .replace('<g fill="url(#s)">', '<g class="intro-strands" fill="url(#s)">')
    .replace(/<path /g, () => `<path style="--i:${i++}" `);
}

export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-stage">
        <div className="intro-mark">
          <div className="intro-mark-svg" dangerouslySetInnerHTML={{ __html: markSvg() }} />
          <span className="intro-scan" />
        </div>
        <p className="intro-word">
          <span className="intro-word-ao">
            A<span className="text-gold">&amp;</span>O
          </span>
          <span className="intro-word-k">Kreative</span>
        </p>
      </div>
    </div>
  );
}

/** Runs before first paint: decides whether the intro plays on this visit. */
export const INTRO_GATE = `try{var d=document.documentElement;if(sessionStorage.getItem('ao-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='off'}else{sessionStorage.setItem('ao-intro','1')}}catch(e){document.documentElement.dataset.intro='off'}`;
