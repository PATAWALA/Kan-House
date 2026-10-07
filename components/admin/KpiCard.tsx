"use client";

import Link from "next/link";
import {
  Package,
  ShoppingBag,
  FileText,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Variant = "default" | "bordeaux" | "espresso" | "sand";

type IconName = "package" | "shopping-bag" | "file-text" | "briefcase" | "eye" | "users" | "trending-up";

const ICONS: Record<IconName, LucideIcon> = {
  "package":       Package,
  "shopping-bag":  ShoppingBag,
  "file-text":     FileText,
  "briefcase":     Briefcase,
  "eye":           Eye,
  "users":         Users,
  "trending-up":   TrendingUp,
};

interface KpiCardProps {
  label: string;
  value: string | number;
  iconName: IconName;
  href?: string;
  trend?: { value: number; direction: "up" | "down"; label?: string };
  variant?: Variant;
}

const VARIANTS: Record<
  Variant,
  {
    background: string;
    color: string;
    colorMuted: string;
    border: string;
    iconBg: string;
    iconColor: string;
    hoverBg: string;
    isDark: boolean;
  }
> = {
  default: {
    background: "var(--color-cafe-light)",
    color: "var(--color-espresso)",
    colorMuted: "rgba(26, 26, 26, 0.5)",
    border: "var(--color-border-line)",
    iconBg: "var(--color-cafe-dark)",
    iconColor: "rgba(26, 26, 26, 0.65)",
    hoverBg: "var(--color-cafe-dark)",
    isDark: false,
  },
  sand: {
    background: "linear-gradient(135deg, #F2EDE4 0%, #E8E2D5 55%, #D8D0C2 100%)",
    color: "var(--color-espresso)",
    colorMuted: "rgba(26, 26, 26, 0.55)",
    border: "#D8D0C2",
    iconBg: "rgba(26, 26, 26, 0.06)",
    iconColor: "rgba(26, 26, 26, 0.7)",
    hoverBg: "linear-gradient(135deg, #E8E2D5 0%, #D8D0C2 55%, #CBC1B1 100%)",
    isDark: false,
  },
  bordeaux: {
    background: "linear-gradient(135deg, #3B1415 0%, #4A1D1E 50%, #5E2324 100%)",
    color: "var(--color-cafe-light)",
    colorMuted: "rgba(239, 236, 230, 0.6)",
    border: "#4A1D1E",
    iconBg: "rgba(239, 236, 230, 0.12)",
    iconColor: "var(--color-cafe-light)",
    hoverBg: "linear-gradient(135deg, #2A0E0F 0%, #3B1415 50%, #4A1D1E 100%)",
    isDark: true,
  },
  espresso: {
    background: "linear-gradient(135deg, #1A1A1A 0%, #2D2B2A 50%, #1A1A1A 100%)",
    color: "var(--color-cafe-light)",
    colorMuted: "rgba(239, 236, 230, 0.55)",
    border: "#2D2B2A",
    iconBg: "rgba(239, 236, 230, 0.1)",
    iconColor: "var(--color-cafe-light)",
    hoverBg: "linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #0F0F0F 100%)",
    isDark: true,
  },
};

export default function KpiCard({
  label,
  value,
  iconName,
  href,
  trend,
  variant = "default",
}: KpiCardProps) {
  const s = VARIANTS[variant];
  const Icon = ICONS[iconName];

  const Wrapper: any = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative flex flex-col p-5 lg:p-6 overflow-hidden"
      style={{
        background: s.background,
        border: `1px solid ${s.border}`,
        transition: "background 400ms ease",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        if (href) e.currentTarget.style.background = s.hoverBg;
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        if (href) e.currentTarget.style.background = s.background;
      }}
    >
      {s.isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16
                     w-40 h-40 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              variant === "bordeaux"
                ? "radial-gradient(circle, rgba(139, 53, 54, 0.9) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(80, 80, 80, 0.5) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative flex items-start justify-between mb-6">
        <span
          className="w-9 h-9 grid place-items-center"
          style={{ backgroundColor: s.iconBg, color: s.iconColor }}
        >
          <Icon size={16} strokeWidth={1.5} />
        </span>

        {trend && (
          <span
            className="inline-flex items-center gap-1 text-[0.65rem] font-medium px-2 py-0.5"
            style={{
              backgroundColor:
                trend.direction === "up"
                  ? s.isDark
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(16, 185, 129, 0.12)"
                  : s.isDark
                  ? "rgba(239, 68, 68, 0.2)"
                  : "rgba(239, 68, 68, 0.12)",
              color:
                trend.direction === "up"
                  ? s.isDark
                    ? "#6EE7B7"
                    : "#047857"
                  : s.isDark
                  ? "#FCA5A5"
                  : "#B91C1C",
            }}
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
        className="relative text-[1.75rem] lg:text-[2rem] leading-none
                   font-normal tabular-nums mb-2"
        style={{ color: s.color }}
      >
        {value}
      </p>

      <p
        className="relative text-[0.65rem] font-medium uppercase tracking-[0.2em]"
        style={{ color: s.colorMuted }}
      >
        {label}
      </p>

      {trend?.label && (
        <p
          className="relative text-[0.68rem] mt-1"
          style={{
            color: s.isDark
              ? "rgba(239, 236, 230, 0.45)"
              : "rgba(26, 26, 26, 0.4)",
          }}
        >
          {trend.label}
        </p>
      )}
    </Wrapper>
  );
}