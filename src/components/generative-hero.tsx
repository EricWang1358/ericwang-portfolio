"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

/* Pearlescent spectrum — maps to the pearl/iridescent theme */
const PEARL_HUES = [340, 20, 50, 170, 240, 290, 310];

/**
 * Generative particle flow-field canvas.
 * Particles drift through layered trigonometric vector fields,
 * their trails accumulating into gossamer wisps that shift
 * through the pearlescent color spectrum.
 *
 * Mouse proximity gently bends the field.
 * Dark mode: iridescent fireflies against void (screen blend).
 * Light mode: soft pearlescent motes on cream (normal blend).
 *
 * @skill algorithmic-art — "Pearlescent Flow" philosophy
 */
export function GenerativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Respect reduced-motion preference */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId = 0;
    let frame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", onMouse);

    /* ── Flow field: layered trig → organic vector field ── */
    const flow = (x: number, y: number, t: number) => {
      const s = 0.0018;
      return (
        Math.sin(x * s * 1.1 + t * 0.25) * 2.0 +
        Math.cos(y * s * 1.3 + t * 0.18) * 1.7 +
        Math.sin((x + y) * s * 0.6 + t * 0.12) * 1.4 +
        Math.cos(x * s * 0.4 - y * s * 0.9 + t * 0.2) * 1.0
      );
    };

    const isMobile = w < 640;
    const COUNT = isMobile ? 60 : 120;

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      life: Math.random() * 180,
      maxLife: 250 + Math.random() * 350,
      hue: PEARL_HUES[Math.floor(Math.random() * PEARL_HUES.length)],
      size: 0.6 + Math.random() * 1.8,
    });

    const particles: Particle[] = Array.from({ length: COUNT }, spawn);

    const dark = () =>
      document.documentElement.classList.contains("dark");

    /* ── Render loop ── */
    const animate = () => {
      const t = frame * 0.007;
      frame++;
      const isDark = dark();

      /* Clear canvas fully each frame (no lingering trails) */
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      /* Dark mode: screen blend → luminous glow */
      ctx.globalCompositeOperation = isDark ? "screen" : "source-over";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        /* Flow force */
        const angle = flow(p.x, p.y, t);
        p.vx += Math.cos(angle) * 0.03;
        p.vy += Math.sin(angle) * 0.03;

        /* Mouse attraction (gentle gravity well) */
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 10) {
          const strength = 0.1 * (1 - dist / 560); // gentle falloff
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;
        }

        /* Damping */
        p.vx *= 0.80;
        p.vy *= 0.80;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        /* Life-cycle alpha: fade in → sustain → fade out */
        const lr = p.life / p.maxLife;
        const alpha =
          lr < 0.1
            ? lr / 0.1
            : lr > 0.85
              ? (1 - lr) / 0.15
              : 1;

        /* Respawn */
        if (
          p.life >= p.maxLife ||
          p.x < -40 || p.x > w + 40 ||
          p.y < -40 || p.y > h + 40
        ) {
          Object.assign(p, spawn());
          p.life = 0;
        }

        const a = alpha * (isDark ? 0.45 : 0.9);
        const l = isDark ? 72 : 88;
        const sat = isDark ? 55 : 20;

        /* Draw mote */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${l}%, ${a})`;
        ctx.fill();

        /* Draw trail */
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.25) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 10, p.y - p.vy * 10);
          ctx.strokeStyle = `hsla(${p.hue}, ${sat + 10}%, ${l}%, ${a * 0.35})`;
          ctx.lineWidth = p.size * 0.4;
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
