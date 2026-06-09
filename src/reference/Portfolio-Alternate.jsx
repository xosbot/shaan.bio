import { useState, useEffect, useRef } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:      #08080E;
      --ink2:     #0F0F18;
      --surface:  #111118;
      --border:   rgba(184,149,42,0.12);
      --gold:     #C4A35A;
      --gold2:    #8B6914;
      --cream:    #F2EDE4;
      --warm:     #BFB8AC;
      --muted:    #6B6660;
      --faint:    rgba(242,237,228,0.06);

      --serif:    'Cormorant Garamond', Georgia, serif;
      --body:     'EB Garamond', Georgia, serif;
      --mono:     'DM Mono', monospace;
      --sans:     'DM Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--ink);
      color: var(--cream);
      font-family: var(--body);
      font-size: 18px;
      line-height: 1.7;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::selection { background: var(--gold2); color: var(--cream); }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--ink); }
    ::-webkit-scrollbar-thumb { background: var(--gold2); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes goldPulse {
      0%, 100% { opacity: 0.4; } 50% { opacity: 1; }
    }
    @keyframes drift {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-6px); }
    }
    @keyframes scanH {
      0%   { transform: translateY(-100vh); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-delay-1 { transition-delay: 0.12s; }
    .reveal-delay-2 { transition-delay: 0.24s; }
    .reveal-delay-3 { transition-delay: 0.36s; }
    .reveal-delay-4 { transition-delay: 0.48s; }
    .reveal-delay-5 { transition-delay: 0.60s; }
    .reveal-delay-6 { transition-delay: 0.72s; }

    .gold { color: var(--gold); }
    .muted { color: var(--muted); font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; }

    .section-rule {
      width: 48px; height: 1px;
      background: linear-gradient(90deg, var(--gold), transparent);
      margin-bottom: 24px;
    }

    .eyebrow {
      font-family: var(--mono);
      font-size: 10px;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 20px;
    }

    .display {
      font-family: var(--serif);
      font-weight: 300;
      letter-spacing: 0.02em;
      line-height: 1.08;
    }

    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
    }

    .nav-link {
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 0.18em;
      color: var(--muted);
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.25s;
    }
    .nav-link:hover { color: var(--cream); }

    .venture-card {
      border: 1px solid var(--border);
      padding: 32px 28px;
      background: transparent;
      transition: background 0.35s, border-color 0.35s;
      cursor: default;
      position: relative;
    }
    .venture-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--gold2), transparent);
      opacity: 0;
      transition: opacity 0.35s;
    }
    .venture-card:hover {
      background: var(--faint);
      border-color: rgba(184,149,42,0.3);
    }
    .venture-card:hover::before { opacity: 1; }

    .input-field {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(184,149,42,0.25);
      padding: 12px 0;
      color: var(--cream);
      font-family: var(--body);
      font-size: 17px;
      outline: none;
      transition: border-color 0.3s;
    }
    .input-field::placeholder { color: var(--muted); }
    .input-field:focus { border-color: var(--gold); }

    .btn-submit {
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      background: transparent;
      color: var(--gold);
      border: 1px solid rgba(184,149,42,0.4);
      padding: 16px 40px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-submit:hover {
      background: rgba(184,149,42,0.08);
      border-color: var(--gold);
    }

    @media (max-width: 900px) {
      .grid-3 { grid-template-columns: 1fr !important; }
      .grid-2 { grid-template-columns: 1fr !important; }
      .hero-name { font-size: clamp(3.5rem, 14vw, 9rem) !important; }
    }
  `}</style>
);

// ─── GRAVITY CANVAS ───────────────────────────────────────────────────────────
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

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────
const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 60px", height: "68px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: solid ? "rgba(8,8,14,0.96)" : "transparent",
      backdropFilter: solid ? "blur(24px)" : "none",
      borderBottom: solid ? "1px solid var(--border)" : "none",
      transition: "all 0.5s ease",
    }}>
      {/* Monogram */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "34px", height: "34px",
          border: "1px solid rgba(184,149,42,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "var(--serif)",
            fontSize: "16px",
            fontWeight: 300,
            color: "var(--gold)",
            lineHeight: 1,
            letterSpacing: "0.05em",
          }}>S</span>
        </div>
        <span style={{
          fontFamily: "var(--mono)",
          fontSize: "10px",
          letterSpacing: "0.3em",
          color: "var(--muted)",
          textTransform: "uppercase",
        }}>Dr. Shaan Sherif</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "36px" }}>
        {[["about","About"],["ventures","Ventures"],["innovations","Innovations"],["recognition","Recognition"],["contact","Contact"]].map(([id, label]) => (
          <span key={id} className="nav-link" onClick={() => go(id)}>{label}</span>
        ))}
      </div>
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="hero" style={{
    position: "relative",
    height: "100vh", minHeight: "700px",
    display: "flex", alignItems: "center",
    overflow: "hidden",
    background: "var(--ink)",
  }}>
    <GravityCanvas />

    {/* Subtle vignette */}
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,14,0.7) 100%)",
      pointerEvents: "none",
    }} />

    {/* Content */}
    <div style={{
      position: "relative", zIndex: 10,
      width: "100%", maxWidth: "1320px",
      margin: "0 auto", padding: "0 60px",
    }}>
      {/* Eyebrow */}
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "10px",
        letterSpacing: "0.4em",
        color: "var(--gold)",
        textTransform: "uppercase",
        marginBottom: "48px",
        animation: "fadeIn 1.2s ease both",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
        Corporate Consultant · Inventor · Strategic Catalyst
        <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
      </div>

      {/* Name */}
      <h1 className="hero-name display" style={{
        fontSize: "clamp(4rem, 12vw, 10rem)",
        color: "var(--cream)",
        marginBottom: "0px",
        animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both",
        letterSpacing: "-0.01em",
      }}>
        Dr. Shaan
      </h1>
      <h1 className="hero-name display" style={{
        fontSize: "clamp(4rem, 12vw, 10rem)",
        color: "transparent",
        WebkitTextStroke: "1px rgba(196,163,90,0.5)",
        marginBottom: "48px",
        animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both",
        letterSpacing: "-0.01em",
      }}>
        Sherif
      </h1>

      {/* Tagline */}
      <p style={{
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
        color: "var(--warm)",
        maxWidth: "520px",
        lineHeight: 1.6,
        animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both",
        marginBottom: "56px",
        letterSpacing: "0.01em",
      }}>
        "I do not move with the current of the world.<br />
        I am the force it moves around."
      </p>

      {/* Stat line */}
      <div style={{
        display: "flex", gap: "48px", flexWrap: "wrap",
        animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.65s both",
      }}>
        {[
          ["28+", "Granted Patents"],
          ["20+", "Years in Enterprise"],
          ["8", "Active Ventures"],
          ["3", "Published Works"],
        ].map(([n, l]) => (
          <div key={l}>
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: "2.4rem",
              fontWeight: 300,
              color: "var(--gold)",
              lineHeight: 1,
              marginBottom: "4px",
            }}>{n}</div>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}>{l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll cue */}
    <div style={{
      position: "absolute",
      bottom: "40px", left: "50%",
      transform: "translateX(-50%)",
      fontFamily: "var(--mono)",
      fontSize: "10px",
      letterSpacing: "0.25em",
      color: "var(--muted)",
      textTransform: "uppercase",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      animation: "fadeIn 2s ease 1.5s both",
    }}>
      <span>Scroll</span>
      <div style={{
        width: "1px", height: "40px",
        background: "linear-gradient(to bottom, var(--gold), transparent)",
        animation: "goldPulse 2s ease-in-out infinite",
      }} />
    </div>

    {/* Man of Gravity label */}
    <div style={{
      position: "absolute",
      right: "60px", top: "50%",
      transform: "translateY(-50%) rotate(90deg)",
      fontFamily: "var(--mono)",
      fontSize: "10px",
      letterSpacing: "0.4em",
      color: "rgba(184,149,42,0.35)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      The Man of Gravity
    </div>
  </section>
);

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" style={{ padding: "140px 60px", background: "var(--ink)", maxWidth: "1320px", margin: "0 auto" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "100px", alignItems: "start" }}>

      {/* Left — Photo placeholder + credentials strip */}
      <div className="reveal">
        {/* Photo placeholder */}
        <div style={{
          width: "100%",
          paddingBottom: "130%",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          position: "relative",
          marginBottom: "32px",
          overflow: "hidden",
        }}>
          {/* Placeholder content */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}>
            {/* Monogram */}
            <div style={{
              width: "80px", height: "80px",
              border: "1px solid rgba(184,149,42,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "var(--serif)",
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "rgba(184,149,42,0.4)",
              }}>S</span>
            </div>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              color: "var(--muted)",
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 2,
            }}>
              Professional<br />Portrait<br />Placeholder
            </div>
          </div>

          {/* Corner accents */}
          {[["0","0","top","left"],["0","0","top","right"],["0","0","bottom","left"],["0","0","bottom","right"]].map(([t,r,pos1,pos2],i) => {
            const styles = { position:"absolute", width:"20px", height:"20px" };
            if (pos1==="top") styles.top = 0; else styles.bottom = 0;
            if (pos2==="left") { styles.left = 0; styles.borderLeft = "1px solid rgba(184,149,42,0.4)"; styles.borderTop = pos1==="top" ? "1px solid rgba(184,149,42,0.4)" : undefined; styles.borderBottom = pos1==="bottom" ? "1px solid rgba(184,149,42,0.4)" : undefined; }
            else { styles.right = 0; styles.borderRight = "1px solid rgba(184,149,42,0.4)"; styles.borderTop = pos1==="top" ? "1px solid rgba(184,149,42,0.4)" : undefined; styles.borderBottom = pos1==="bottom" ? "1px solid rgba(184,149,42,0.4)" : undefined; }
            return <div key={i} style={styles} />;
          })}
        </div>

        {/* Credential strip */}
        {[
          ["Forbes 30 Under 30", "Technology, 2018"],
          ["AR&DB", "Aircraft Research & Development Board"],
          ["28+ Patents", "Granted — Aerospace · RF · Energy · AI"],
          ["13+ Publications", "Peer-Reviewed Journals"],
        ].map(([title, sub]) => (
          <div key={title} style={{
            padding: "16px 0",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{
              fontFamily: "var(--sans)",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--cream)",
              marginBottom: "3px",
            }}>{title}</div>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--muted)",
            }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Right — Bio */}
      <div>
        <div className="reveal">
          <div className="eyebrow">The Man</div>
          <div className="section-rule" />
        </div>

        <h2 className="reveal display reveal-delay-1" style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          color: "var(--cream)",
          marginBottom: "40px",
          lineHeight: 1.12,
          fontWeight: 300,
        }}>
          Strategic Technologist<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>and Systems Architect</em>
        </h2>

        <div className="reveal reveal-delay-2" style={{
          fontFamily: "var(--body)",
          fontSize: "1.05rem",
          lineHeight: 1.9,
          color: "var(--warm)",
          maxWidth: "620px",
        }}>
          <p style={{ marginBottom: "24px" }}>
            Dr. Shaan Sherif is a corporate consultant, technocrat, inventor, and author whose work
            spans advanced technology, strategic systems design, and long-horizon innovation. With more
            than 28 patents across multiple domains, he operates at the intersection of engineering,
            intelligence frameworks, and scalable enterprise architecture.
          </p>
          <p style={{ marginBottom: "24px" }}>
            Beginning his entrepreneurial path at eighteen, Shaan has contributed to ventures across
            IT infrastructure, artificial intelligence, cryptographic systems, and strategic advisory.
            His approach integrates technical depth with behavioral insight — applying cognitive and
            decision-science principles to complex business and organizational challenges.
          </p>
          <p style={{ marginBottom: "24px" }}>
            As CEO and Co-Founder of Harver Space Corp, he led the world's first successful
            miniaturization of a Synthetic Aperture Radar satellite — a landmark in space systems
            engineering recognized by Forbes in 2018. His technical expertise spans aerostructures,
            electromagnetic-structural interactions, conformal antenna systems, and fiber-optic
            structural health monitoring.
          </p>
          <p>
            His authored works explore neuroscience, strategic ethics, and individual sovereignty in
            technological societies. Current R&D directions include human-AI interface systems,
            privacy-centric digital architectures, and applied frameworks for transforming systemic
            inefficiencies into scalable opportunity. His work is defined by cross-disciplinary
            synthesis, systems thinking, and the design of resilient structures intended to operate
            at planetary and multi-decade scale.
          </p>
        </div>

        {/* Quote block */}
        <div className="reveal reveal-delay-3" style={{
          marginTop: "56px",
          padding: "32px 40px",
          borderLeft: "2px solid var(--gold2)",
          background: "rgba(184,149,42,0.04)",
        }}>
          <p style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.25rem",
            color: "var(--cream)",
            lineHeight: 1.7,
            marginBottom: "16px",
          }}>
            "I harness the forces others cannot see — gravity, minds, markets, and systems —
            to build structures that endure beyond any single epoch."
          </p>
          <div style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}>
            — Dr. Shaan Sherif
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── VENTURES ─────────────────────────────────────────────────────────────────
const Ventures = () => {
  const ventures = [
    {
      name: "Harver Space Corp",
      domain: "Aerospace · Space Systems",
      desc: "CEO & Co-Founder. World's first miniaturized SAR satellite. All-weather, day-night Earth observation at planetary scale.",
      status: "Active",
      featured: true,
    },
    {
      name: "Harver Space Industries Inc.",
      domain: "Aerospace · Orbital Services",
      desc: "Advanced orbital debris removal and space infrastructure. Pioneering the BTL legal framework for cross-border debris operations.",
      status: "Active",
    },
    {
      name: "D'org",
      domain: "Governance · DAO",
      desc: "Decentralized autonomous organization dedicated to anti-corruption and anti-money laundering through transparent governance.",
      status: "Active",
    },
    {
      name: "13O3 Ltd.",
      domain: "Quantum Technology · Fintech",
      desc: "Pioneering next-generation quantum technological innovation at the intersection of computing and financial systems.",
      status: "Active",
    },
    {
      name: "Universal Hertz Conglomerates",
      domain: "Frequency Technology",
      desc: "Advanced research and application of frequency-based technologies spanning communications, energy, and materials science.",
      status: "Active",
    },
    {
      name: "Bond Mechanism Pvt Ltd",
      domain: "Financial Engineering",
      desc: "Revolutionary financial engineering solutions for complex sovereign and institutional capital structures.",
      status: "Active",
    },
    {
      name: "OHMS Energy Corp",
      domain: "Sustainable Energy",
      desc: "Scalable sustainable and renewable energy systems. Committed to next-generation power infrastructure.",
      status: "Active",
    },
    {
      name: "Harver Foundation for Human Science",
      domain: "Neuroscience · Cognition",
      desc: "Exploring neural frontiers and the full potential of the human mind. Research into consciousness and cognitive enhancement.",
      status: "Foundation",
    },
    {
      name: "Harver Foundation for Scientific Research & Space Exploration",
      domain: "Cosmic Research",
      desc: "Fundamental cosmic research and expansive space exploration. The long arc of scientific inquiry.",
      status: "Foundation",
    },
    {
      name: "FOI — Fraternity of Immortals",
      domain: "Elite Network · Upcoming",
      desc: "An invitation-only platform fostering connectivity and influence among the world's most exceptional operators.",
      status: "Forthcoming",
    },
  ];

  return (
    <section id="ventures" style={{ padding: "140px 60px", background: "var(--ink2)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "80px" }}>
          <div className="eyebrow">Enterprise Portfolio</div>
          <div className="section-rule" />
          <h2 className="display" style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            color: "var(--cream)",
            maxWidth: "600px",
            lineHeight: 1.2,
          }}>
            Ten Ventures.<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>One Architecture of Thought.</em>
          </h2>
        </div>

        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "var(--border)" }}>
          {ventures.map((v, i) => (
            <div key={i} className={`venture-card reveal reveal-delay-${(i % 4) + 1}`}
              style={{ background: "var(--ink2)" }}>
              {/* Status */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                marginBottom: "20px",
              }}>
                <span style={{
                  fontFamily: "var(--mono)",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  color: v.status === "Forthcoming" ? "var(--muted)" : "var(--gold)",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: `1px solid ${v.status === "Forthcoming" ? "rgba(107,102,96,0.3)" : "rgba(184,149,42,0.25)"}`,
                }}>{v.status}</span>
                {v.featured && (
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "var(--ink)",
                    background: "var(--gold)",
                    padding: "4px 10px",
                    textTransform: "uppercase",
                  }}>Flagship</span>
                )}
              </div>

              <h3 style={{
                fontFamily: "var(--serif)",
                fontWeight: 400,
                fontSize: "1.2rem",
                color: "var(--cream)",
                marginBottom: "8px",
                lineHeight: 1.3,
                letterSpacing: "0.01em",
              }}>{v.name}</h3>

              <div style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "var(--gold)",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}>{v.domain}</div>

              <p style={{
                fontFamily: "var(--sans)",
                fontSize: "13px",
                color: "var(--muted)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── INNOVATIONS ──────────────────────────────────────────────────────────────
const Innovations = () => (
  <section id="innovations" style={{ padding: "140px 60px", background: "var(--ink)" }}>
    <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
      <div className="reveal" style={{ marginBottom: "80px" }}>
        <div className="eyebrow">Landmark Innovations</div>
        <div className="section-rule" />
        <h2 className="display" style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "var(--cream)",
          lineHeight: 1.2,
        }}>
          First Principles.<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Original Breakthroughs.</em>
        </h2>
      </div>

      {/* Featured innovations */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", marginBottom: "1px" }}>
        {[
          {
            num: "001",
            name: "SAR Satellite Miniaturization",
            category: "Aerospace · Space Systems",
            body: "As CEO of Harver Space Corp, led the development of the world's first successfully miniaturized Synthetic Aperture Radar satellite. This breakthrough enables persistent, all-weather, day-night Earth monitoring at a fraction of the cost of legacy systems — democratizing space-based intelligence for commercial, defense, and sovereign operators.",
            credential: "Forbes 30 Under 30, Technology — 2018",
            delay: "reveal-delay-1",
          },
          {
            num: "002",
            name: "Harver Wireless",
            category: "RF Engineering · Energy",
            body: "A patented RF-energy harvesting platform designed to enable continuous, ambient-powered charging for mobile and IoT devices. By capturing and converting ambient radio frequency energy, Harver Wireless eliminates dependency on conventional power sources — a step toward perpetually connected, infrastructure-independent device ecosystems.",
            credential: "28+ Granted Patents Portfolio",
            delay: "reveal-delay-2",
          },
        ].map((item, i) => (
          <div key={i} className={`reveal ${item.delay}`} style={{
            padding: "60px 52px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Background number */}
            <div style={{
              position: "absolute",
              top: "24px", right: "32px",
              fontFamily: "var(--serif)",
              fontSize: "5rem",
              fontWeight: 300,
              color: "rgba(184,149,42,0.06)",
              lineHeight: 1,
              userSelect: "none",
            }}>{item.num}</div>

            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}>{item.category}</div>

            <h3 style={{
              fontFamily: "var(--serif)",
              fontSize: "1.7rem",
              fontWeight: 400,
              color: "var(--cream)",
              marginBottom: "24px",
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}>{item.name}</h3>

            <p style={{
              fontFamily: "var(--sans)",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "var(--muted)",
              marginBottom: "32px",
              fontWeight: 300,
            }}>{item.body}</p>

            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "rgba(184,149,42,0.5)",
              paddingTop: "24px",
              borderTop: "1px solid var(--border)",
            }}>{item.credential}</div>
          </div>
        ))}
      </div>

      {/* Patent & publication stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1px",
        background: "var(--border)",
      }}>
        {[
          ["28+", "Granted Patents"],
          ["3", "International Patents", "Aerospace & Sensing"],
          ["13+", "Technical Publications", "Peer-Reviewed"],
          ["2012", "Venture Origin", "Harver Space Co-Founded"],
        ].map(([n, l, sub], i) => (
          <div key={i} className={`reveal reveal-delay-${i+1}`} style={{
            padding: "40px 36px",
            background: "var(--ink2)",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: "2.8rem",
              fontWeight: 300,
              color: "var(--gold)",
              lineHeight: 1,
              marginBottom: "10px",
            }}>{n}</div>
            <div style={{
              fontFamily: "var(--sans)",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--cream)",
              marginBottom: "4px",
            }}>{l}</div>
            {sub && <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--muted)",
            }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* Expertise domains */}
      <div className="reveal" style={{ marginTop: "80px" }}>
        <div className="eyebrow" style={{ marginBottom: "32px" }}>Technical Domains</div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          {[
            "Synthetic Aperture Radar",
            "Aerostructures & Composites",
            "RF Energy Systems",
            "Structural Health Monitoring",
            "Conformal Antenna Systems",
            "Electromagnetic Compatibility",
            "Digital Twins",
            "AI & Machine Learning",
            "Quantum Computing",
            "Autonomous Systems",
            "Blockchain & Distributed Ledgers",
            "Cybersecurity",
            "Computer Vision",
            "IoT Architecture",
            "Nanotechnology & Materials",
            "Robotic Process Automation",
          ].map(d => (
            <span key={d} style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              padding: "8px 16px",
              border: "1px solid var(--border)",
              textTransform: "uppercase",
              transition: "color 0.25s, border-color 0.25s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.target.style.color = "var(--gold)"; e.target.style.borderColor = "rgba(184,149,42,0.35)"; }}
              onMouseLeave={e => { e.target.style.color = "var(--muted)"; e.target.style.borderColor = "var(--border)"; }}
            >{d}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── WORKS ────────────────────────────────────────────────────────────────────
const Works = () => (
  <section style={{ padding: "140px 60px", background: "var(--ink2)" }}>
    <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
      <div className="reveal" style={{ marginBottom: "80px" }}>
        <div className="eyebrow">Published Works</div>
        <div className="section-rule" />
        <h2 className="display" style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "var(--cream)",
          lineHeight: 1.2,
        }}>
          Three Works.<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Each a Discipline of Its Own.</em>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)" }}>
        {[
          {
            title: "The Synaptic Horizon",
            subject: "Neuroscience · Neural Interfaces",
            desc: "A comprehensive exploration of advanced neuroscience and the expanding frontier of neural interfaces. Examines the architecture of consciousness, the mechanisms of cognition, and the implications of human-machine neural integration.",
            n: "I",
            delay: "reveal-delay-1",
          },
          {
            title: "Omerata",
            subject: "Strategic Ethics",
            desc: "A rigorous strategic and ethical framework for navigating the increasingly complex moral terrain of technology and modern society. A treatise for operators who build systems that govern human behavior.",
            n: "II",
            delay: "reveal-delay-2",
          },
          {
            title: "DJ Unchained",
            subject: "Digital Sovereignty · Freedom",
            desc: "A manifesto on digital and personal freedom in an era of pervasive connectivity and institutional overreach. A philosophical examination of sovereignty, autonomy, and the architecture of liberated identity.",
            n: "III",
            delay: "reveal-delay-3",
          },
        ].map((book, i) => (
          <div key={i} className={`reveal ${book.delay}`} style={{
            padding: "56px 44px",
            background: "var(--ink2)",
            position: "relative",
          }}>
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: "4rem",
              fontWeight: 300,
              color: "rgba(184,149,42,0.1)",
              lineHeight: 1,
              marginBottom: "32px",
            }}>{book.n}</div>

            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>{book.subject}</div>

            <h3 style={{
              fontFamily: "var(--serif)",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "var(--cream)",
              marginBottom: "20px",
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}>{book.title}</h3>

            <p style={{
              fontFamily: "var(--sans)",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "var(--muted)",
              fontWeight: 300,
            }}>{book.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── RECOGNITION ──────────────────────────────────────────────────────────────
const Recognition = () => (
  <section id="recognition" style={{ padding: "140px 60px", background: "var(--ink)" }}>
    <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
      <div className="reveal" style={{ marginBottom: "80px" }}>
        <div className="eyebrow">Recognition & Affiliations</div>
        <div className="section-rule" />
        <h2 className="display" style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300,
          color: "var(--cream)",
          lineHeight: 1.2,
        }}>
          Validated by Institutions.<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Driven by Purpose.</em>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "1px" }}>
        {[
          {
            org: "Forbes",
            detail: "30 Under 30 — Technology",
            year: "2018",
            context: "Named among global innovators for the world's first miniaturized Synthetic Aperture Radar satellite.",
            delay: "reveal-delay-1",
          },
          {
            org: "Aircraft Research & Development Board",
            detail: "Board Member",
            year: "Ongoing",
            context: "Expert member on institutional technical review panels for advanced aerospace programs.",
            delay: "reveal-delay-2",
          },
          {
            org: "VTT — Technical Research Centre",
            detail: "Research Fellow",
            year: "Founding",
            context: "RFID & Wireless Sensing Group, Shenzhen. Foundational research in ambient RF energy systems.",
            delay: "reveal-delay-3",
          },
          {
            org: "International Journals",
            detail: "Peer Reviewer",
            year: "Active",
            context: "Expert reviewer across 13+ peer-reviewed publications in aerospace and applied sciences.",
            delay: "reveal-delay-4",
          },
        ].map((item, i) => (
          <div key={i} className={`reveal ${item.delay}`} style={{
            padding: "52px 48px",
            background: "var(--ink)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "1.3rem",
                fontWeight: 400,
                color: "var(--cream)",
                letterSpacing: "0.01em",
              }}>{item.org}</h3>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                color: "var(--muted)",
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
                marginLeft: "16px",
              }}>{item.year}</span>
            </div>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>{item.detail}</div>
            <p style={{
              fontFamily: "var(--sans)",
              fontSize: "13px",
              color: "var(--muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}>{item.context}</p>
          </div>
        ))}
      </div>

      {/* Academic background */}
      <div className="reveal" style={{
        padding: "48px 52px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
        <div className="eyebrow" style={{ marginBottom: "32px" }}>Academic & Research Background</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
          {[
            ["Electronics & Electrical Engineering", "VTT University, Bangalore"],
            ["Radio Science & Engineering", "Advanced Studies, Hong Kong"],
            ["Harver Multimedia Technologies", "Co-Founder — Entrepreneurial Origin"],
          ].map(([subject, inst]) => (
            <div key={inst}>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--cream)",
                marginBottom: "6px",
              }}>{subject}</div>
              <div style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--muted)",
              }}>{inst}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: "", org: "", email: "", type: "investor", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <section id="contact" style={{ padding: "140px 60px", background: "var(--ink2)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "120px", alignItems: "start" }}>

          {/* Left */}
          <div>
            <div className="reveal">
              <div className="eyebrow">Initiate Contact</div>
              <div className="section-rule" />
              <h2 className="display" style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "var(--cream)",
                lineHeight: 1.2,
                marginBottom: "32px",
              }}>
                For those who<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>operate at altitude.</em>
              </h2>
            </div>

            <div className="reveal reveal-delay-1" style={{
              fontFamily: "var(--sans)",
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.9,
              fontWeight: 300,
              marginBottom: "56px",
            }}>
              <p style={{ marginBottom: "20px" }}>
                Dr. Shaan Sherif engages with a select number of investors, sovereign partners,
                and institutional collaborators each year. If you are exploring capital deployment
                across aerospace, deep technology, or frontier systems — this is the right conversation.
              </p>
              <p>
                All enquiries are reviewed personally. Responses are extended to qualified principals.
              </p>
            </div>

            {/* Contact details */}
            <div className="reveal reveal-delay-2">
              {[
                ["Nature of Engagement", "Investor Relations · Strategic Partnership · Advisory"],
                ["Response Protocol", "Qualified principals within 5 business days"],
                ["Confidentiality", "All enquiries treated as strictly confidential"],
              ].map(([label, val]) => (
                <div key={label} style={{
                  padding: "20px 0",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}>{label}</div>
                  <div style={{
                    fontFamily: "var(--sans)",
                    fontSize: "13px",
                    color: "var(--warm)",
                    fontWeight: 300,
                  }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal reveal-delay-2">
            {sent ? (
              <div style={{
                padding: "80px 60px",
                border: "1px solid var(--border)",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "var(--serif)",
                  fontSize: "3rem",
                  fontWeight: 300,
                  color: "var(--gold)",
                  marginBottom: "16px",
                }}>✦</div>
                <h3 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "var(--cream)",
                  marginBottom: "16px",
                  fontStyle: "italic",
                }}>Enquiry Received</h3>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "13px",
                  color: "var(--muted)",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}>
                  Your message has been received. Qualified principals
                  will hear from us within five business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: "48px 52px", border: "1px solid var(--border)", background: "rgba(184,149,42,0.02)" }}>
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  marginBottom: "40px",
                }}>Investor & Partner Enquiry</div>

                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                  { key: "org", label: "Organization", type: "text", placeholder: "Fund / Institution / Corporation" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@address.com" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: "36px" }}>
                    <label style={{
                      fontFamily: "var(--mono)",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "10px",
                    }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                ))}

                <div style={{ marginBottom: "36px" }}>
                  <label style={{
                    fontFamily: "var(--mono)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "10px",
                  }}>Nature of Enquiry</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(184,149,42,0.25)",
                      padding: "12px 0",
                      color: "var(--cream)",
                      fontFamily: "var(--body)",
                      fontSize: "17px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="investor" style={{ background: "#0F0F18" }}>Investment Discussion</option>
                    <option value="partner" style={{ background: "#0F0F18" }}>Strategic Partnership</option>
                    <option value="advisory" style={{ background: "#0F0F18" }}>Advisory Engagement</option>
                    <option value="sovereign" style={{ background: "#0F0F18" }}>Sovereign / Institutional</option>
                    <option value="media" style={{ background: "#0F0F18" }}>Media & Speaking</option>
                  </select>
                </div>

                <div style={{ marginBottom: "48px" }}>
                  <label style={{
                    fontFamily: "var(--mono)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "10px",
                  }}>Message</label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your interest or proposal..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(184,149,42,0.25)",
                      padding: "12px 0",
                      color: "var(--cream)",
                      fontFamily: "var(--sans)",
                      fontSize: "14px",
                      outline: "none",
                      resize: "none",
                      fontWeight: 300,
                    }}
                  />
                </div>

                <button type="submit" className="btn-submit">
                  Submit Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    padding: "48px 60px",
    background: "var(--ink)",
    borderTop: "1px solid var(--border)",
  }}>
    <div style={{
      maxWidth: "1320px", margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "28px", height: "28px",
          border: "1px solid rgba(184,149,42,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: "14px", color: "var(--gold)", fontWeight: 300 }}>S</span>
        </div>
        <span style={{
          fontFamily: "var(--mono)",
          fontSize: "10px",
          letterSpacing: "0.25em",
          color: "var(--muted)",
        }}>DR. SHAAN SHERIF</span>
      </div>

      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "10px",
        letterSpacing: "0.15em",
        color: "rgba(107,102,96,0.5)",
      }}>
        STRATEGIC CATALYST · THE MAN OF GRAVITY
      </div>

      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "10px",
        letterSpacing: "0.15em",
        color: "rgba(107,102,96,0.4)",
      }}>
        © {new Date().getFullYear()} — ALL RIGHTS RESERVED
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <>
      <Styles />
      <Nav />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Ventures />
      <div className="divider" />
      <Innovations />
      <div className="divider" />
      <Works />
      <div className="divider" />
      <Recognition />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}
