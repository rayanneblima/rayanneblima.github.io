import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-mono tracking-wider",
        variant === "default" &&
          "bg-surface text-foreground-muted border border-border",
        variant === "accent" &&
          "bg-accent-glow text-accent-light border border-accent/20",
        variant === "outline" &&
          "border border-border text-foreground-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
