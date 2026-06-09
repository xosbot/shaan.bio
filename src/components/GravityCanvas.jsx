import { useEffect, useRef } from "react";

const GravityCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Gravitational particles
    const COUNT = 180;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      gold: Math.random() > 0.82,
      orbit: Math.random() * Math.PI * 2,
      orbitR: 0.15 + Math.random() * 0.42,
      orbitSpeed: (Math.random() * 0.0003 + 0.00008) * (Math.random() > 0.5 ? 1 : -1),
    }));

    // Concentric rings (gravitational wells)
    const rings = [0.12, 0.24, 0.38, 0.52].map(r => ({
      r,
      alpha: 0.06 - r * 0.08,
    }));

    let t = 0;
    const cx = () => W / 2;
    const cy = () => H / 2;
    const S  = () => Math.min(W, H);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Central glow — the gravitational centre
      const g = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), S() * 0.3);
      g.addColorStop(0, "rgba(180,140,50,0.06)");
      g.addColorStop(0.5, "rgba(140,100,30,0.02)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Rings
      rings.forEach(ring => {
        ctx.strokeStyle = `rgba(184,149,42,${ring.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 12]);
        ctx.beginPath();
        ctx.arc(cx(), cy(), ring.r * S(), 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Particles
      particles.forEach(p => {
        p.orbit += p.orbitSpeed;
        const dx = cx() + Math.cos(p.orbit) * p.orbitR * S();
        const dy = cy() + Math.sin(p.orbit) * p.orbitR * S() * 0.45;

        const alpha = p.alpha * (0.5 + Math.sin(t * 0.008 + p.orbit) * 0.5);
        const color = p.gold ? `rgba(196,163,90,${alpha})` : `rgba(191,184,172,${alpha * 0.6})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle crossing lines — gravitational field lines
      if (t % 3 === 0) {
        ctx.strokeStyle = "rgba(184,149,42,0.03)";
        ctx.lineWidth = 0.5;
        const drawn = Math.floor(t / 3) % 8;
        const angle = (drawn / 8) * Math.PI;
        const r = S() * 0.6;
        ctx.beginPath();
        ctx.moveTo(cx() + Math.cos(angle) * r, cy() + Math.sin(angle) * r * 0.5);
        ctx.lineTo(cx() - Math.cos(angle) * r, cy() - Math.sin(angle) * r * 0.5);
        ctx.stroke();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: "absolute",
      inset: 0, width: "100%", height: "100%",
      display: "block",
      opacity: 0.9,
    }} />
  );
};

export default GravityCanvas;
