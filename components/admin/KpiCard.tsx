import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  href?: string;
  trend?: { value: number; direction: "up" | "down"; label?: string };
  accent?: boolean;
}

export default function KpiCard({
  label, value, icon: Icon, href, trend, accent = false,
}: KpiCardProps) {
  const Wrapper: any = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative flex flex-col p-5 lg:p-6 transition-colors duration-200",
        href && "hover:bg-[var(--color-cafe-dark)]/40",
        accent && "bg-[var(--color-espresso)] text-[var(--color-cafe-light)]"
      )}
      style={{
        border: `1px solid ${accent ? "var(--color-espresso)" : "var(--color-border-line)"}`,
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <span
          className={cn(
            "w-9 h-9 grid place-items-center",
            accent
              ? "bg-[var(--color-cafe-light)]/10 text-[var(--color-cafe-light)]"
              : "bg-[var(--color-cafe-dark)] text-[var(--color-espresso)]/65"
          )}
        >
          <Icon size={16} strokeWidth={1.5} />
        </span>

        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[0.65rem] font-medium px-2 py-0.5",
              trend.direction === "up"
                ? accent
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-emerald-500/10 text-emerald-700"
                : accent
                ? "bg-red-500/20 text-red-200"
                : "bg-red-500/10 text-red-700"
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight size={11} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={11} strokeWidth={2.5} />
            )}
            {trend.value}%
          </span>
        )}
      </div>

      <p
        className={cn(
          "text-[1.75rem] lg:text-[2rem] leading-none font-normal tabular-nums mb-2",
          accent ? "text-[var(--color-cafe-light)]" : "text-[var(--color-espresso)]"
        )}
      >
        {value}
      </p>

      <p
        className={cn(
          "text-[0.65rem] font-medium uppercase tracking-[0.2em]",
          accent
            ? "text-[var(--color-cafe-light)]/55"
            : "text-[var(--color-espresso)]/50"
        )}
      >
        {label}
      </p>

      {trend?.label && (
        <p
          className={cn(
            "text-[0.68rem] mt-1",
            accent
              ? "text-[var(--color-cafe-light)]/45"
              : "text-[var(--color-espresso)]/40"
          )}
        >
          {trend.label}
        </p>
      )}
    </Wrapper>
  );
}