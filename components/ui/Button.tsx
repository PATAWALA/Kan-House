import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "cream";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type Props = ButtonAsButton | ButtonAsLink;

const VARIANTS: Record<Variant, string> = {
  // Bordeaux plein — CTA principal sur fond clair
  primary:
    "bg-[var(--color-bordeaux)] text-[var(--color-cream)] hover:bg-[var(--color-bordeaux-deep)]",
  // Contour espresso — CTA secondaire sur fond clair
  secondary:
    "border border-[var(--color-espresso)] text-[var(--color-espresso)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]",
  // Fantôme — action discrète
  ghost:
    "text-[var(--color-espresso)] hover:text-[var(--color-bordeaux)]",
  // Crème sur bordeaux — CTA sur fond bordeaux (navbar, hero sombre, footer)
  cream:
    "bg-[var(--color-cream)] text-[var(--color-bordeaux)] hover:bg-[var(--color-sand)]",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.68rem]",
  md: "px-6 py-3.5 text-[0.72rem]",
  lg: "px-7 py-4 text-[0.75rem]",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: Props) {
  const isLink = "href" in rest && typeof rest.href === "string";

  const classes = cn(
    "group inline-flex items-center gap-2.5 rounded-full font-semibold uppercase tracking-[0.22em] transition-all duration-200 whitespace-nowrap",
    VARIANTS[variant],
    SIZES[size],
    variant !== "ghost" && "shadow-sm hover:shadow-md",
    className
  );

  const content = (
    <>
      {children}
      {icon && (
        <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (isLink) {
    const { href } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {content}
    </button>
  );
}