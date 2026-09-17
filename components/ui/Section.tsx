import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  bleed?: boolean; // pleine largeur (bannières couleur)
  id?: string;
};

export default function Section({
  children,
  className,
  size = "md",
  bleed = false,
  id,
}: SectionProps) {
  const sizeClass = {
    sm: "section-y-sm",
    md: "section-y",
    lg: "section-y-lg",
  }[size];

  return (
    <section id={id} className={cn(sizeClass, bleed ? "w-full" : "container-kan", className)}>
      {children}
    </section>
  );
}