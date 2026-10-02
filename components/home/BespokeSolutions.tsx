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
      <div className="container-kan">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                        gap-x-8 lg:gap-x-12
                        py-10 md:py-12">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-4
                         py-4 sm:py-2
                         sm:justify-center
                         lg:justify-start"
            >
              <Icon
                size={20}
                strokeWidth={1.3}
                className="text-[var(--color-espresso)]/70 shrink-0"
              />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em]
                            text-[var(--color-espresso)]/75 leading-[1.6]
                            max-w-[14rem]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}