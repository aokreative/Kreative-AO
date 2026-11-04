import fs from "node:fs";
import path from "node:path";

/**
 * Opening animation: a fingerprint scan of the original A&O mark.
 * Pure CSS, so it plays and dismisses itself even before JavaScript loads.
 * Kept short (about 1.4s) because it sits over the first paint: shown on a
 * visitor's first visit only (then once a month), skipped on any tap, scroll
 * or key, and never shown to visitors who prefer reduced motion.
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

/** Runs before first paint: decides whether the intro plays on this visit,
    and lets any tap, scroll or key press skip it. */
export const INTRO_GATE = `try{var d=document.documentElement,k='ao-intro-seen',t=+localStorage.getItem(k)||0;if(Date.now()-t<2592e6||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='off'}else{localStorage.setItem(k,Date.now());var x=function(){d.dataset.intro='off'};['pointerdown','wheel','keydown','touchstart'].forEach(function(e){addEventListener(e,x,{once:true,passive:true})})}}catch(e){document.documentElement.dataset.intro='off'}`;
