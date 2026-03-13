"use client";

import { useRef, useEffect, useCallback } from "react";

interface SpotlightProps {
  radius?: number;
  brightness?: number;
  color?: string;
  className?: string;
}

export function Spotlight({
  radius = 300,
  brightness = 0.08,
  color = "#7C5DFA",
  className,
}: SpotlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hexToRgb = useCallback((hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }, []);

  useEffect(() => {
    /* Skip on touch devices — no mouse spotlight needed */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let mouseActive = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (mx: number, my: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
      const rgbColor = hexToRgb(color);
      gradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseActive) mouseActive = true;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => draw(event.clientX, event.clientY));
    };

    const handleMouseLeave = () => {
      mouseActive = false;
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [radius, brightness, color, hexToRgb]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
