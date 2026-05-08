import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  body,
  breadcrumb,
  variant = "navy",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  breadcrumb?: Array<{ href?: string; label: string }>;
  variant?: "navy" | "crimson" | "cream";
}) {
  const surface =
    variant === "crimson"
      ? "surface-crimson"
      : variant === "cream"
        ? "surface-cream-warm"
        : "surface-navy";
  const textColor = variant === "cream" ? "text-charcoal" : "text-cream";
  return (
    <header className={`${surface} grain pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 text-center`}>
      <div className="container-narrow">
        {breadcrumb && (
          <p className={`text-xs ${variant === "cream" ? "text-charcoal/60" : "text-cream-warm/70"} mb-6 tracking-cta`}>
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {b.href ? (
                  <Link href={b.href} className={variant === "cream" ? "text-crimson hover:underline" : "text-gold hover:underline"}>
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="mx-2 opacity-50">·</span>}
              </span>
            ))}
          </p>
        )}
        {eyebrow && (
          <p className={`eyebrow ${variant === "cream" ? "text-crimson" : "text-gold"} mb-4`}>{eyebrow}</p>
        )}
        <h1 className={`display-1 ${textColor} max-w-4xl mx-auto text-balance`}>{title}</h1>
        {body && (
          <p className={`mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${variant === "cream" ? "text-charcoal/75" : "text-cream-warm/85"}`}>
            {body}
          </p>
        )}
      </div>
    </header>
  );
}

export function PageHeaderRich({
  children,
  surface = "navy",
}: {
  children: ReactNode;
  surface?: "navy" | "cream" | "crimson";
}) {
  const surfaceClass =
    surface === "crimson" ? "surface-crimson" : surface === "cream" ? "surface-cream-warm" : "surface-navy";
  return <header className={`${surfaceClass} grain py-16 lg:py-24`}>{children}</header>;
}
