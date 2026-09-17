import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  maxWidth?: "sm" | "md" | "lg";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className,
  maxWidth = "md",
}: Props) {
  const widthClass = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
  }[maxWidth];

  return (
    <header
      className={cn(
        widthClass,
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("mb-5", invert ? "eyebrow-invert" : "eyebrow-accent")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6",
          invert ? "text-[var(--color-cream)]" : "text-[var(--color-espresso)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            invert
              ? "text-[var(--color-cream)]/70"
              : "text-[var(--color-espresso)]/70"
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}