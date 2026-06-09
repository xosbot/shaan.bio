import { useState, useEffect } from "react";

const Nav = () => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = id => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="nav-pad" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "68px",
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
          <span className="nav-label" style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}>Dr. Shaan Sherif</span>
        </div>

        {/* Links */}
        <div className="nav-links">
          {[["about","About"],["ventures","Ventures"],["innovations","Innovations"],["recognition","Recognition"],["contact","Contact"]].map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => go(id)}>{label}</span>
          ))}
        </div>

        {/* Burger */}
        <button
          className="nav-burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-pad nav-drawer" style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
          background: "rgba(8,8,14,0.98)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border)",
          paddingTop: "24px", paddingBottom: "24px",
          display: "flex", flexDirection: "column", gap: "20px",
        }}>
          {[["about","About"],["ventures","Ventures"],["innovations","Innovations"],["recognition","Recognition"],["contact","Contact"]].map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => go(id)} style={{ fontSize: "12px" }}>{label}</span>
          ))}
        </div>
      )}
    </>
  );
};

export default Nav;
