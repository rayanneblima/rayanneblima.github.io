/**
 * Splash screen — rendered as pure HTML in the server component layout.
 * No "use client", no useState, no useEffect.
 * Timing is 100% CSS animation + a tiny inline script for DOM cleanup.
 */
export function SplashScreen() {
  return (
    <>
      <div
        id="splash"
        className="splash-overlay fixed inset-0 z-[9998] flex items-center justify-center bg-bg"
        aria-hidden="true"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo animation */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-4">
          <div className="splash-icon">
            <img
              src="/images/logo-icon.webp"
              alt=""
              width={120}
              height={120}
              className="h-20 w-20 sm:h-24 sm:w-24"
            />
          </div>

          <span className="splash-brand font-display text-xl sm:text-2xl font-bold tracking-tight">
            rayanne<span className="text-accent">blima</span>
          </span>

          <span className="text-center splash-subtitle font-mono text-xs uppercase tracking-[0.3em] text-accent wrap-normal">
            Frontend Lead & Full Stack Developer
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-line" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-line" />
      </div>

      {/* Remove splash from DOM after CSS animation ends */}
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){var s=document.getElementById('splash');if(s)s.remove()},2600)`,
        }}
      />
    </>
  );
}
