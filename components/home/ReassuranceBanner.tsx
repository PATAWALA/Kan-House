import { Package, Home, Globe2, Gem } from "lucide-react";

const FEATURES = [
  {
    icon: Package,
    label: "Carefully selected suppliers",
  },
  {
    icon: Home,
    label: "Tailored solutions for private & hospitality",
  },
  {
    icon: Globe2,
    label: "Worldwide sourcing",
  },
  {
    icon: Gem,
    label: "Aesthetics, quality and functionality",
  },
];

export default function ReassuranceBanner() {
  return (
    <section className="border-y border-[var(--color-espresso)]/10 bg-[var(--color-cream)]">
      <div className="container-kan grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 py-12 md:py-16">
        {FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-start gap-4
                       sm:items-center sm:text-center
                       sm:border-r sm:border-[var(--color-espresso)]/10
                       sm:last:border-r-0
                       px-2"
          >
            <Icon
              size={22}
              strokeWidth={1.2}
              className="text-[var(--color-espresso)]/70"
            />
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--color-espresso)]/75 max-w-[16rem] leading-[1.7]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}