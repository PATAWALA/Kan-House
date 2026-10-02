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
            className="flex flex-row items-center gap-4 py-8 px-4
                       sm:flex-col sm:items-start sm:text-left sm:gap-3
                       lg:justify-center"
            style={{
              borderRight:
                index === FEATURES.length - 1
                  ? "none"
                  : "1px solid var(--color-border-line)",
            }}
          >
            <Icon
              size={20}
              strokeWidth={1.2}
              className="text-[var(--color-espresso)]/65 shrink-0"
            />
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em]
                          text-[var(--color-espresso)]/70 leading-[1.7]
                          max-w-[15rem]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}