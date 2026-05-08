export function DifferenceBand() {
  return (
    <section className="surface-cream section">
      <div className="container-site grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">The Dé-light Difference</p>
          <h2 className="display-2 mb-7 max-w-2xl text-balance">
            We do not sell dresses. We architect the woman.
          </h2>
          <div className="space-y-5 text-charcoal/80 max-w-xl text-base sm:text-lg leading-relaxed">
            <p>Most fashion houses sell you a piece. Beulah builds your image. The piece is the byproduct.</p>
            <p>
              Every Dé-light look starts with a question that has nothing to do with fabric: who are you in the room you
              are walking into? What does your presence need to say before you speak? What does the woman you are
              becoming wear?
            </p>
            <p>
              Once we know that, the dress designs itself. So does the next one, and the one after that. Ten years in,
              that is what our clients keep coming back for.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="bg-navy text-cream rounded-md p-8 sm:p-10 grain shadow-card">
            <p className="eyebrow text-gold mb-6">Ten years on record</p>
            <div className="space-y-7">
              <Stat num="10" label="Years in business" />
              <div className="h-px bg-cream/15" />
              <Stat num="600,000" label="Monthly Pinterest saves" />
              <div className="h-px bg-cream/15" />
              <Stat num={<>&lt;&nbsp;1<span className="text-2xl">hr</span></>} label="From first message to confirmed order" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-5xl sm:text-6xl text-gold leading-none mb-2 font-medium">{num}</div>
      <div className="text-xs uppercase tracking-eyebrow text-cream-warm/85 font-bold">{label}</div>
    </div>
  );
}
