import { cn } from "@/lib/cn";

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-cafe-dark)]",
        className
      )}
      {...props}
    />
  );
}