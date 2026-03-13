"use client";

import { TechIcon } from "@/components/ui/tech-icon";

const techStack = [
  "Vue.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Storybook",
  "Node.js",
  "Laravel",
  "Supabase",
  "Docker",
  "Cloudflare",
];

/* Same techs, different order */
const techStackShuffled = [
  "Supabase",
  "TypeScript",
  "Docker",
  "Vue.js",
  "Cloudflare",
  "Storybook",
  "Next.js",
  "Laravel",
  "Node.js",
  "Tailwind CSS",
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-4 py-2 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex items-center gap-2 rounded-full border border-line/60 bg-bg-elevated/50 px-4 py-2 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:bg-accent/5"
          >
            <TechIcon name={tech} size={16} />
            <span className="whitespace-nowrap font-mono text-xs tracking-wider text-text-secondary">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechMarqueeTop() {
  return <MarqueeRow items={techStack} />;
}

export function TechMarqueeBottom() {
  return <MarqueeRow items={techStackShuffled} reverse />;
}
