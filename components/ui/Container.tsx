import { cn } from "@/lib/cn";

export default function Container({
  children,
  narrow = false,
  className,
}: {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(narrow ? "container-narrow" : "container-kan", className)}>
      {children}
    </div>
  );
}