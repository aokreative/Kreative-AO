"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* A typical first six months with A&O, told by one object.
   The orb is the client's business: grey on day one, gold once it has a
   brand, then rings (website, ads, WhatsApp) start pulling customers in,
   and a grid appears once the systems run it. */
const STAGES = [
  { when: "Day one", name: "The idea", note: "A good product and a few loyal customers." },
  { when: "Week 2", name: "Brand", note: "A name, look and message people remember." },
  { when: "Month 1", name: "Website", note: "A fast site that turns visits into enquiries." },
  { when: "Month 2", name: "Ads", note: "The right people start finding you every day." },
  { when: "Month 3", name: "WhatsApp AI", note: "Every enquiry answered in seconds, day or night." },
  { when: "Month 6", name: "Systems", note: "Sales, stock and payments run from one place." },
  { when: "Today", name: "Growth", note: "A business that runs well and keeps growing." },
] as const;

const LAST = STAGES.length - 1;
const TICKS_PER_STAGE = 8;
const TICKS = LAST * TICKS_PER_STAGE + 1;
const MAX_PARTICLES = 34;

type Particle = { ring: number; a: number; r: number; w: number; wait: number; spiral: boolean };

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (c: number[], alpha = 1) => `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;

const GREY = { hi: [233, 236, 241], mid: [164, 173, 186], lo: [86, 96, 112] };
const GOLD = { hi: [247, 229, 172], mid: [207, 167, 75], lo: [120, 91, 28] };
const HAZE = [150, 162, 181];
const WARM = [196, 152, 52];

export function OrbTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const target = useRef(LAST);
  const current = useRef(LAST);
  const particles = useRef<Particle[]>([]);
  const pulse = useRef(0);
  const still = useRef(false);
  const playTimer = useRef<number | null>(null);

  const [value, setValue] = useState<number>(LAST);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);

  const stage = STAGES[Math.round(value)];

  const setTarget = useCallback((v: number) => {
    const next = clamp(v, 0, LAST);
    target.current = next;
    setValue(next);
  }, []);

  const stopPlay = useCallback(() => {
    if (playTimer.current) window.clearTimeout(playTimer.current);
    playTimer.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(
    (from?: number) => {
      stopPlay();
      let i = from ?? (Math.round(target.current) >= LAST ? 0 : Math.round(target.current));
      setTarget(i);
      setPlaying(true);
      const step = () => {
        i += 1;
        if (i > LAST) {
          setPlaying(false);
          playTimer.current = null;
          return;
        }
        setTarget(i);
        playTimer.current = window.setTimeout(step, 1500);
      };
      playTimer.current = window.setTimeout(step, 1100);
    },
    [setTarget, stopPlay],
  );

  /* Canvas: sized to its box, redrawn every frame while visible. */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Spread customers along the rings so even a still frame shows them.
    particles.current = Array.from({ length: MAX_PARTICLES }, (_, i) => ({
      ring: i % 3,
      a: Math.random() * Math.PI * 2,
      r: 0,
      w: 0.25 + Math.random() * 0.35,
      wait: Math.random() * 5,
      spiral: Math.random() < 0.35,
    }));

    const TILT = -0.2;
    const FLAT = 0.3;

    const draw = (dt: number, time: number) => {
      const s = still.current ? target.current : current.current;
      const cx = W / 2;
      const cy = H * 0.46;
      const R = Math.min(W * 0.18, H * 0.28);
      const rings = [R * 1.5, R * 1.95, R * 2.4];

      const gold = smooth(0.15, 1.05, s);
      const ringA = rings.map((_, i) => smooth(1.45 + i, 2.15 + i, s));
      const density = smooth(2.45, 6, s);
      const speed = 0.55 + 0.9 * smooth(3.4, 4.4, s);
      const gridA = smooth(4.4, 5.2, s);
      const lift = smooth(5.2, 6, s);

      ctx.clearRect(0, 0, W, H);

      // Floor shadow, as if the orb sits on the page.
      const fy = cy + R * 1.36;
      const sh = ctx.createRadialGradient(cx, fy, 0, cx, fy, R * 1.1);
      sh.addColorStop(0, "rgba(19,35,58,0.16)");
      sh.addColorStop(1, "rgba(19,35,58,0)");
      ctx.save();
      ctx.translate(cx, fy);
      ctx.scale(1, 0.16);
      ctx.translate(-cx, -fy);
      ctx.fillStyle = sh;
      ctx.beginPath();
      ctx.arc(cx, fy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Warm glow once the business is running.
      const glowA = 0.1 * gold + 0.32 * lift + 0.25 * pulse.current;
      if (glowA > 0.01) {
        const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 2.3);
        g.addColorStop(0, `rgba(217,186,110,${glowA})`);
        g.addColorStop(1, "rgba(217,186,110,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      const ringStroke = (i: number, from: number, to: number) => {
        if (ringA[i] < 0.01) return;
        ctx.strokeStyle = `rgba(140,110,41,${0.42 * ringA[i]})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Draw the arc progressively as it appears, like a pen stroke.
        const span = (to - from) * clamp(ringA[i] * 1.15);
        ctx.ellipse(cx, cy, rings[i], rings[i] * FLAT, TILT, from, from + span);
        ctx.stroke();
      };

      // Update customers.
      const active = Math.round(density * MAX_PARTICLES);
      const visibleRings = ringA.map((a) => a > 0.5);
      const outer = visibleRings.lastIndexOf(true);
      const pts: { x: number; y: number; front: boolean; warm: number; size: number }[] = [];
      particles.current.forEach((p, idx) => {
        if (idx >= active || outer < 0) return;
        if (p.ring > outer) p.ring = outer;
        if (p.r === 0) p.r = rings[p.ring] * (p.spiral ? 0.75 + Math.random() * 0.25 : 1);
        if (!still.current) {
          p.a += p.w * dt * speed;
          if (!p.spiral) {
            p.wait -= dt;
            if (p.wait <= 0) p.spiral = true;
          } else {
            p.r -= dt * R * 0.32 * speed;
            if (p.r <= R * 0.98) {
              pulse.current = Math.min(1, pulse.current + 0.22);
              p.ring = Math.floor(Math.random() * (outer + 1));
              p.r = rings[p.ring];
              p.a = Math.random() * Math.PI * 2;
              p.wait = 1.2 + Math.random() * 4;
              p.spiral = false;
            }
          }
        }
        const ex = p.r * Math.cos(p.a);
        const ey = p.r * FLAT * Math.sin(p.a);
        const x = cx + ex * Math.cos(TILT) - ey * Math.sin(TILT);
        const y = cy + ex * Math.sin(TILT) + ey * Math.cos(TILT);
        const front = Math.sin(p.a) > 0;
        const warm = clamp(1 - (p.r - R) / (R * 1.4));
        pts.push({ x, y, front, warm, size: (W / 520) * (front ? 3.1 : 2.3) });
      });

      const dot = (q: (typeof pts)[number]) => {
        ctx.fillStyle = rgb(mix(HAZE, WARM, q.warm), q.front ? 1 : 0.45);
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.size, 0, Math.PI * 2);
        ctx.fill();
      };

      // Back halves first, then the orb, then the front halves.
      rings.forEach((_, i) => ringStroke(i, Math.PI, Math.PI * 2));
      pts.filter((q) => !q.front).forEach(dot);

      const hi = mix(GREY.hi, GOLD.hi, gold);
      const mid = mix(GREY.mid, GOLD.mid, gold);
      const lo = mix(GREY.lo, GOLD.lo, gold);
      const body = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.42, R * 0.05, cx, cy, R * 1.05);
      body.addColorStop(0, rgb(hi));
      body.addColorStop(0.5, rgb(mid));
      body.addColorStop(1, rgb(lo));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // The systems grid: a slowly turning globe of lines on the orb.
      if (gridA > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.clip();
        ctx.lineWidth = 1;
        const spin = still.current ? 0.4 : time * 0.00018;
        for (let i = 0; i < 6; i++) {
          const lam = (i * Math.PI) / 6 + spin;
          const sx = Math.sin(lam);
          const facing = Math.cos(lam);
          if (facing <= 0) continue;
          ctx.strokeStyle = `rgba(255,248,226,${0.5 * gridA * facing})`;
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(sx) * R, R, 0, sx >= 0 ? -Math.PI / 2 : Math.PI / 2, sx >= 0 ? Math.PI / 2 : (Math.PI * 3) / 2);
          ctx.stroke();
        }
        ctx.strokeStyle = `rgba(255,248,226,${0.32 * gridA})`;
        for (const k of [-0.6, -0.25, 0.1, 0.45]) {
          const rx = R * Math.sqrt(1 - k * k);
          ctx.beginPath();
          ctx.ellipse(cx, cy + R * k, rx, rx * 0.18, 0, 0, Math.PI);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Soft highlight, stronger once it is gold.
      const spec = ctx.createRadialGradient(cx - R * 0.42, cy - R * 0.5, 0, cx - R * 0.42, cy - R * 0.5, R * 0.55);
      spec.addColorStop(0, `rgba(255,255,255,${0.22 + 0.18 * gold})`);
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Each arriving customer leaves a brief ring of light.
      if (pulse.current > 0.02) {
        ctx.strokeStyle = `rgba(217,186,110,${0.55 * pulse.current})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, R * (1.03 + 0.05 * (1 - pulse.current)), 0, Math.PI * 2);
        ctx.stroke();
      }

      rings.forEach((_, i) => ringStroke(i, 0, Math.PI));
      pts.filter((q) => q.front).forEach(dot);

      pulse.current *= Math.exp(-dt * 2.6);
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      current.current += (target.current - current.current) * (1 - Math.exp(-dt * 4.5));
      draw(dt, now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || still.current) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(wrap);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    if (still.current) {
      const redraw = () => draw(0, 0);
      redraw();
      const id = window.setInterval(redraw, 250);
      return () => {
        window.clearInterval(id);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    }

    // The one orchestrated moment: play the first six months on arrival.
    current.current = 0;
    target.current = 0;
    setValue(0);
    // Wait for the opening animation when it is playing on this visit.
    const introOn = document.documentElement.dataset.intro !== "off";
    const kick = window.setTimeout(() => play(0), introOn ? 2500 : 700);

    return () => {
      window.clearTimeout(kick);
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [play]);

  useEffect(() => () => stopPlay(), [stopPlay]);

  /* Scrubber input */
  const valueFromX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return target.current;
    const r = el.getBoundingClientRect();
    return clamp((clientX - r.left) / r.width) * LAST;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopPlay();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setTarget(valueFromX(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setTarget(valueFromX(e.clientX));
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    setTarget(Math.round(target.current));
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = Math.round(target.current);
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowUp: i + 1,
      ArrowLeft: i - 1,
      ArrowDown: i - 1,
      Home: 0,
      End: LAST,
    };
    if (e.key in keys) {
      e.preventDefault();
      stopPlay();
      setTarget(keys[e.key]);
    }
  };

  const handleTick = value * TICKS_PER_STAGE;

  return (
    <div className="flex w-full flex-col items-center">
      <div ref={wrapRef} className="relative aspect-[3/2] w-full max-w-[560px]">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      </div>

      {/* The controls sit on frosted glass over the orb's glow. */}
      <div className="lg relative z-10 -mt-16 flex w-full max-w-[500px] flex-col items-center rounded-[30px] px-5 pb-4 pt-5 sm:-mt-20">
      <div aria-live="polite" className="flex min-h-[64px] flex-col items-center px-2 text-center">
        <p className="text-[17px] font-semibold text-ink" style={{ fontStretch: "112%" }}>
          {stage.when}
        </p>
        <p className="mt-1 max-w-[46ch] text-[15px] text-ink-3">
          <span className="font-semibold text-ink">{stage.name}.</span> {stage.note}
        </p>
      </div>

      <div className="mt-3 w-full max-w-[420px] px-2">
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="A typical first six months with A&O Kreative"
          aria-valuemin={0}
          aria-valuemax={LAST}
          aria-valuenow={Math.round(value)}
          aria-valuetext={`${stage.when}: ${stage.name}. ${stage.note}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          className="relative h-10 cursor-ew-resize touch-none select-none rounded-md"
        >
          {Array.from({ length: TICKS }, (_, t) => {
            const major = t % TICKS_PER_STAGE === 0;
            const d = Math.abs(t - handleTick);
            const grow = Math.max(0, 16 - d * 2.6);
            const h = (major ? 12 : 7) + grow;
            return (
              <span
                key={t}
                aria-hidden
                className={`tick absolute bottom-2 w-px -translate-x-1/2 ${
                  major ? "bg-ink-3" : "bg-line"
                }`}
                style={{ left: `${(t / (TICKS - 1)) * 100}%`, height: `${h}px` }}
              />
            );
          })}
          <span
            aria-hidden
            className={`absolute bottom-2 h-[30px] w-[2px] -translate-x-1/2 rounded-full bg-midnight ${
              dragging ? "" : "transition-[left] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            }`}
            style={{ left: `${(value / LAST) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[12.5px] text-ink-3">
          <span>Day one</span>
          <span>Today</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-[13.5px] text-ink-3">
        <button
          type="button"
          onClick={() => (playing ? stopPlay() : play())}
          className="inline-flex h-8 items-center gap-2 rounded-full bg-midnight px-3.5 font-semibold text-white transition-colors hover:bg-harbour"
        >
          <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current">
            {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
          </svg>
          {playing ? "Pause" : Math.round(value) === LAST ? "Play again" : "Play"}
        </button>
        <span className="hidden sm:inline">Drag the timeline to explore</span>
      </div>
      </div>
    </div>
  );
}
