import { Package, Home, Globe2, Gem } from "lucide-react";

const FEATURES = [
  { icon: Package, label: "Carefully selected suppliers" },
  { icon: Home, label: "Tailored solutions for private & hospitality" },
  { icon: Globe2, label: "Worldwide sourcing" },
  { icon: Gem, label: "Aesthetics, quality and functionality" },
];

export default function ReassuranceBanner() {
  return (
    <section
      className="bg-[var(--color-cafe-light)]"
      style={{
        borderTop: "1px solid var(--color-border-line)",
        borderBottom: "1px solid var(--color-border-line)",
      }}
    >
      <div className="container-kan grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, label }, index) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-4 py-10 px-4"
            style={{
              borderRight:
                index === FEATURES.length - 1
                  ? "none"
                  : "1px solid var(--color-border-line)",
            }}
          >
            <Icon
              size={22}
              strokeWidth={1.2}
              className="text-[var(--color-espresso)]/70"
            />
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em]
                          text-[var(--color-espresso)]/75 max-w-[15rem] leading-[1.7]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}