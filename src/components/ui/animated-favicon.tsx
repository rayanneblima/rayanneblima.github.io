"use client";

import { useEffect, useRef } from "react";

/**
 * Animated favicon — pulses accent color when tab loses focus.
 * Restores original favicon when tab regains focus.
 */
export function AnimatedFavicon() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalHrefRef = useRef<string>("");

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="32x32"]');
    if (!link) return;

    originalHrefRef.current = link.href;

    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Load original favicon as base image */
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = originalHrefRef.current;

    let frame = 0;

    function drawAnimatedFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, 32, 32);

      /* Draw original icon */
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, 32, 32);
      }

      /* Draw pulsing accent dot in bottom-right */
      const pulse = Math.sin(frame * 0.15) * 0.5 + 0.5; // 0→1 sine wave
      const radius = 4 + pulse * 2;
      const alpha = 0.6 + pulse * 0.4;

      ctx.beginPath();
      ctx.arc(26, 26, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 93, 250, ${alpha})`;
      ctx.fill();

      /* Tiny bright center */
      ctx.beginPath();
      ctx.arc(26, 26, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(183, 148, 246, ${alpha})`;
      ctx.fill();

      frame++;
      link!.href = canvas.toDataURL("image/png");
    }

    function startAnimation() {
      if (intervalRef.current) return;
      frame = 0;
      intervalRef.current = setInterval(drawAnimatedFrame, 80);
    }

    function stopAnimation() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      /* Restore original */
      link!.href = originalHrefRef.current;
    }

    function onVisibilityChange() {
      if (document.hidden) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopAnimation();
    };
  }, []);

  return null;
}
