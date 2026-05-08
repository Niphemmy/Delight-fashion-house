import Image from "next/image";
import Link from "next/link";

export function MeetBeulah() {
  return (
    <section className="surface-cream section">
      <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-md overflow-hidden shadow-modal relative bg-cream-deep">
            <Image
              src="/designs/founder-portrait.jpg"
              alt="Beulah Oluwafisayomi Mobolaji, Founder, Dé-light Fashion House"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -top-4 -left-4 w-24 h-24 border border-crimson/30 rounded-md -z-10" />
          <div className="hidden lg:block absolute -bottom-4 -right-4 w-32 h-32 bg-gold/15 rounded-md -z-10" />
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">Meet Beulah</p>
          <h2 className="display-2 mb-7 max-w-xl text-balance">
            She has been quietly dressing the women you admire for ten years.
          </h2>
          <div className="space-y-5 text-charcoal/80 max-w-xl text-base sm:text-lg leading-relaxed mb-8">
            <p>
              <strong className="text-navy font-semibold">Beulah Oluwafisayomi Mobolaji</strong> started Dé-light
              Fashion House more than a decade ago, before the words 'personal stylist' meant much in Lagos.
            </p>
            <p>
              She did not call herself a designer. She called herself something more useful: the woman who knows
              what you should wear before you do.
            </p>
            <p>
              In ten years, she has built wardrobes for executives, brides, mothers of the bride, women returning
              to work after time away, women starting over, and women who finally have the income to dress the way
              they have always seen themselves.
            </p>
            <p className="text-crimson font-medium">
              If you have been saving her looks on Pinterest and never reached out, this is your sign.
            </p>
          </div>
          <Link href="/our-story" className="btn-link">
            Read the full story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
