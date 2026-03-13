import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  titleAccent: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  titleAccent,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
        {`// ${label}`}
      </span>
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
          "leading-[1.1]"
        )}
      >
        {title}
        <br />
        <span className="text-accent">{titleAccent}</span>
      </h2>
    </div>
  );
}
