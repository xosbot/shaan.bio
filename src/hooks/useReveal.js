import { useState, useEffect } from "react";

export const useScrollPosition = () => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const handler = () => setPosition(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  
  return position;
};

export const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};
