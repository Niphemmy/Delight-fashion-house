import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/utils";

type Variant = "white" | "navy" | "crimson" | "charcoal";

const SRC: Record<Variant, string> = {
  white: "/brand/logo-white.png",
  navy: "/brand/logo-navy.png",
  crimson: "/brand/logo-crimson.png",
  charcoal: "/brand/logo-charcoal.png",
};

export function Logo({
  variant = "navy",
  className,
  width = 220,
  withLink = true,
  priority = false,
}: {
  variant?: Variant;
  className?: string;
  width?: number;
  withLink?: boolean;
  priority?: boolean;
}) {
  const inner = (
    <Image
      src={SRC[variant]}
      alt="Dé-light Fashion House"
      width={width}
      height={Math.round((width * 1056) / 1851)}
      priority={priority}
      className={cx("h-auto select-none", className)}
    />
  );
  if (!withLink) return inner;
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Dé-light Fashion House home">
      {inner}
    </Link>
  );
}
