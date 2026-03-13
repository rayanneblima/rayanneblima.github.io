import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/50 p-6 backdrop-blur-sm",
        hover &&
          "transition-all duration-300 hover:border-accent/30 hover:bg-surface-hover hover:shadow-[0_0_30px_var(--color-accent-glow)]",
        className
      )}
    >
      {children}
    </div>
  );
}
