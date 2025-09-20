"use client"
import * as React from "react";

/** tiny utility like shadcn's cn */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Local Button (shadcn-ish API) */
type BaseProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
};
type ButtonProps =
  | (BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | (BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>);

function Button(props: ButtonProps) {
  const {
    className,
    children,
    variant = "primary",
    size = "default",
    href,
    ...rest
  } = props as any;

  const base =
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/10 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
    primary:
      "text-black bg-gradient-to-b from-white to-white/90 hover:to-white shadow-[0_8px_30px_rgba(255,255,255,0.18)] border border-white/80",
    secondary:
      "text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur",
    outline:
      "text-white border border-white hover:bg-white/10",
    ghost:
      "text-white hover:bg-white/10",
    link:
      "text-white underline underline-offset-4 hover:opacity-80 px-0 py-0",
  };

  const sizes: Record<NonNullable<BaseProps["size"]>, string> = {
    default: "h-11 px-5",
    sm: "h-9 px-4",
    lg: "h-12 px-6 text-base",
    icon: "h-11 w-11",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl" />
        </span>
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl" />
      </span>
    </button>
  );
}

/** Hero — same cinematic background, NO card; text uses drop-shadows for readability */
function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageUrl,
}: {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
}) {
  return (
    <section
      className="relative min-h-[80svh] md:min-h-[92svh] overflow-hidden text-white"
      aria-label="Queens Park hero"
    >
      {/* Base photo + dark gradient */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.65) 30%, rgba(0,0,0,.75)), url(${imageUrl})`,
        }}
      />

      {/* Animated light beams */}
      <div className="pointer-events-none absolute -inset-20">
        <div className="absolute left-1/2 top-[-10%] h-[120vh] w-[80vw] -translate-x-1/2 rotate-[18deg] animate-beam-slow bg-gradient-to-b from-white/10 via-white/[0.04] to-transparent blur-2xl" />
        <div className="absolute left-[10%] top-[-10%] h-[120vh] w-[60vw] rotate-[-14deg] animate-beam-fast bg-gradient-to-b from-pink-200/10 via-white/[0.05] to-transparent blur-3xl" />
        <div className="absolute right-[-10%] top-[-20%] h-[120vh] w-[55vw] rotate-[26deg] animate-beam-slow bg-gradient-to-b from-sky-200/10 via-white/[0.04] to-transparent blur-3xl" />
      </div>

      {/* Radial vignette & glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.20),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_120%,rgba(0,0,0,0.65),rgba(0,0,0,0))]" />
      </div>

      {/* Film grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:radial-gradient(1px_1px_at_20px_20px,rgba(255,255,255,0.4),transparent_1.5px)] bg-[length:24px_24px]" />

      {/* Content container (no card) */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-28 flex items-center min-h-[80svh] md:min-h-[92svh]">
        <div className="max-w-3xl">
          {/* Eyebrow + trust */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs md:text-sm backdrop-blur">
              Open daily • 9:00–20:00
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-white/90">
              <Stars aria-hidden />
              <span className="font-medium">4.9</span>
              <span className="text-white/70">/ 5 • 12k+ reviews</span>
            </span>
          </div>

          {/* Headline & copy — no container */}
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">
            {title}
          </h1>
          <p className="mt-4 md:mt-5 text-base md:text-xl text-white/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={ctaLink} variant="primary" size="lg" aria-label="Plan your visit">
              🎟️ Plan Your Visit
            </Button>
            {secondaryCtaText && secondaryCtaLink && (
              <Button href={secondaryCtaLink} variant="secondary" size="lg" aria-label="Explore rides">
                🎢 {secondaryCtaText}
              </Button>
            )}
          </div>

          {/* Small reassurance row */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/80">
            <span className="inline-flex items-center gap-2">
              <Shield aria-hidden /> Safe & kid-friendly
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkle aria-hidden /> Free parking
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock aria-hidden /> Same-day tickets available
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80">
        <div className="flex flex-col items-center gap-2 text-xs">
          <span className="opacity-80">Scroll</span>
          <span className="block h-9 w-[2px] overflow-hidden rounded-full bg-white/30">
            <span className="block h-3 w-[2px] animate-scroll bg-white" />
          </span>
        </div>
      </div>

      {/* Local keyframes / icons */}
      <style jsx>{`
        @keyframes beam-slow {
          0% { transform: translateY(-5%) rotate(0deg); opacity: 0.9; }
          50% { transform: translateY(2%) rotate(1deg); opacity: 0.75; }
          100% { transform: translateY(-5%) rotate(0deg); opacity: 0.9; }
        }
        @keyframes beam-fast {
          0% { transform: translateY(-8%) rotate(0deg); opacity: 0.9; }
          50% { transform: translateY(4%) rotate(-1deg); opacity: 0.7; }
          100% { transform: translateY(-8%) rotate(0deg); opacity: 0.9; }
        }
        .animate-beam-slow { animation: beam-slow 10s ease-in-out infinite; }
        .animate-beam-fast { animation: beam-fast 8s ease-in-out infinite; }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(12px); opacity: .2; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scroll { animation: scroll 1.6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

/** Minimal inline icons (no external packages) */
function Stars(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l7 3v6c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V5l7-3z" />
    </svg>
  );
}
function Sparkle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2zm7 9 1.2 2.8L23 15l-2.8 1.2L19 19l-1.2-2.8L15 15l2.8-1.2L19 11zM5 13l1 2.4L8.4 16 6 17l-1 2.4L4 17l-2.4-1L4 15l1-2z" />
    </svg>
  );
}
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1.99a10 10 0 1 0 0 20.02 10 10 0 0 0 0-20.02zm1 11.01h4v2h-6V7h2v5.99z" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <Hero
        title="Welcome to Queens Park"
        subtitle="Where wonder sparks, friendships blossom, and every ride ends with a smile."
        ctaText="Plan Your Visit"
        ctaLink="/tickets"
        secondaryCtaText="Explore Rides"
        secondaryCtaLink="/rides"
        imageUrl="/assets/kids.jpg"
      />
    </>
  );
}
