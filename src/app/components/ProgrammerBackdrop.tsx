const DATA_STRIPS = [
  "const focus = buildPortfolio();",
  "git commit -m 'polish interaction'",
  "pnpm build && pnpm dev",
  "render UI -> refine motion -> ship",
];

export function ProgrammerBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 5 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px), radial-gradient(circle at 20% 20%, rgba(14,165,233,0.15), transparent 28%), radial-gradient(circle at 80% 25%, rgba(168,85,247,0.12), transparent 24%)",
          backgroundSize: "100% 30px, 30px 100%, auto, auto",
          maskImage:
            "radial-gradient(circle at center, black 48%, rgba(0,0,0,0.78) 72%, transparent 100%)",
          opacity: 0.75,
          animation: "ambient-drift 26s linear infinite",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 6px)",
          backgroundSize: "100% 6px",
          opacity: 0.4,
          mixBlendMode: "soft-light",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklch, var(--background) 92%, transparent), transparent)",
          filter: "blur(4px)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 0 42%, rgba(5,8,15,0.45) 100%)",
          opacity: 0.85,
        }}
      />

      <div
        className="absolute left-8 top-24 hidden xl:flex flex-col gap-2"
        style={{ animation: "ambient-float 12s ease-in-out infinite" }}
      >
        {DATA_STRIPS.map((line, index) => (
          <div
            key={line}
            className="rounded-full border border-border bg-card/40 px-3 py-1 text-[0.68rem] font-display text-muted-foreground backdrop-blur-sm"
            style={{
              opacity: 0.62 - index * 0.08,
              transform: `translateX(${index * 8}px)`,
              animation: `ambient-pulse ${7 + index * 1.5}s ease-in-out infinite`,
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div
        className="absolute right-10 top-1/4 hidden lg:block"
        style={{
          width: 180,
          height: 180,
          borderRadius: "9999px",
          border: "2px solid rgba(148,163,184,0.24)",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0.08) 35%, transparent 72%)",
          filter: "blur(1px)",
          animation: "ambient-float 16s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}