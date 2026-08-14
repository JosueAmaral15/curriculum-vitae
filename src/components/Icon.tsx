type IconName = "arrow" | "github" | "linkedin" | "mail" | "menu" | "close" | "external";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "arrow") return <svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
  if (name === "menu") return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
  if (name === "close") return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
  if (name === "external") return <svg {...common}><path d="M14 4h6v6"/><path d="M10 14 20 4"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></svg>;
  if (name === "github") return <svg {...common}><path d="M15 22v-3.9c.04-1.02-.3-2.02-.96-2.8 3.15-.35 6.46-1.55 6.46-7A5.5 5.5 0 0 0 19 4.5 5.1 5.1 0 0 0 18.86.64S17.66.26 15 2.05a13.4 13.4 0 0 0-6 0C6.34.26 5.14.64 5.14.64A5.1 5.1 0 0 0 5 4.5a5.5 5.5 0 0 0-1.5 3.8c0 5.44 3.31 6.64 6.46 7A4.02 4.02 0 0 0 9 18.1V22"/><path d="M9 19c-3 .92-3-1.5-4.2-1.92"/></svg>;
  return <svg {...common}><path d="M16 8a6 6 0 0 1-8.5 5.46L4 17v-3.5A6 6 0 1 1 16 8Z"/></svg>;
}
