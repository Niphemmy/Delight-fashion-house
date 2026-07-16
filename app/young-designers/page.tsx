import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Young Fashion Designers Summer Academy 2026 · Eleyele, Ibadan · Ages 9 to 13",
  description:
    "3 weeks that quietly change the shape of your daughter's life. August 10 to 28, 2026. Eleyele, Ibadan. Registration closes July 31. Only 20 slots.",
};

const WHATSAPP_ASK_URL =
  "https://wa.me/2347067132418?text=" +
  encodeURIComponent(
    "Hi Beulah, I want to enrol my child in the Young Fashion Designers Summer Academy 2026 in Ibadan. Please share the details."
  );

const WHATSAPP_RESERVE_URL =
  "https://wa.me/2347067132418?text=" +
  encodeURIComponent(
    "Hi Beulah, I just registered my child for the Young Fashion Designers Summer Academy 2026. I want to secure her slot with the ₦20,000 deposit today. Please share your payment details."
  );

const PAIN_POINTS = [
  {
    line: "She wakes up at 11am, opens TikTok, and it is 4pm before she has spoken to another human.",
  },
  {
    line: "The tablet is now the third parent in the house. Nobody can remember when it started.",
  },
  {
    line: "She used to draw. She used to build things with her hands. Now she scrolls and rates other girls' outfits.",
  },
  {
    line: "You paid for the holiday lessons. She sat through them. She came home with nothing. No skill, no memory, no spark.",
  },
  {
    line: "You keep hearing about the girl next door who won something, made something, sold something. You have not heard your own daughter mention a real interest in six months.",
  },
  {
    line: "Screen time is up 40%. Boredom complaints are up 100%. Actual conversation is down to grunts.",
  },
  {
    line: "You know she has something inside her. A creative gift. A sharpness. You just have not found the room where it lives.",
  },
];

const REWARDS = [
  {
    label: "Three weeks of hands on training",
    detail:
      "Directly with a 10 year atelier owner and her team of tutors. Not YouTube. Not a class of 60. A studio, real fabric, real machines, real hands.",
    value: "₦180,000",
  },
  {
    label: "Every material, tool, and fabric she will use",
    detail:
      "No shopping list to chase. No half list of \"bring your own\" that turns into stress the night before. It is all included. She walks in with her lunch. She walks out with a skill.",
    value: "₦45,000",
  },
  {
    label: "One garment she designed and made herself",
    detail:
      "She takes it home. She wears it to church. When somebody asks her where she got it, she says the words \"I made this\". That sentence changes a child.",
    value: "₦25,000",
  },
  {
    label: "Certificate of Completion signed by Beulah",
    detail:
      "Framed if you want to frame it. Something she keeps. Something that goes on her CV before she is old enough to write one.",
    value: "priceless",
  },
  {
    label: "End of program showcase, parents invited",
    detail:
      "Every child walks the runway with the piece she made. You are in the audience. Photos are taken. She sees you clap. This is the moment she will remember for years.",
    value: "priceless",
  },
  {
    label: "Instagram feature on the Dé-light Fashion House page",
    detail:
      "Her design, her name, her spotlight on a page 17,000+ women follow. She becomes a designer in the world's eyes, not just her mother's.",
    value: "₦50,000",
  },
];

const PRIZES = [
  {
    title: "Professional Mannequin",
    desc: "For the top overall designer. Full sized dress form. The kind we work on in the atelier every day.",
  },
  {
    title: "Complete Beading Equipment Kit",
    desc: "For the most improved. Every bead, needle, tray, and thread she needs to keep going after the three weeks are done.",
  },
  {
    title: "Pattern Making Tool Set",
    desc: "For the sharpest technical eye. Rulers, curves, tracing wheel, awl. Actual atelier tools, not toys.",
  },
];

const FOR_HER = [
  "She is between 9 and 13 years old.",
  "She has ever asked you why clothes cost so much, or why a dress fits one girl and not another.",
  "She sketches in the margins of her notebooks.",
  "She undresses her dolls and re-styles them.",
  "She tells you what to wear.",
  "You want her summer to leave a mark, not a screen tan.",
];

const NOT_FOR_HER = [
  "She is under 9 or over 13. The teaching pace is designed for this window.",
  "You are looking for free daycare. This is a training, not a babysitting service.",
  "You want to enrol her against her will. She has to want it, even a little.",
];

const FAQS = [
  {
    q: "Where exactly is the academy held?",
    a: "At Beulah's atelier in Eleyele, Ibadan. Full address is shared once your slot is confirmed. Secure premises, parents welcome to inspect before day one.",
  },
  {
    q: "What are the daily hours?",
    a: "Morning session: 9:00am to 12:00pm. Afternoon session: 1:00pm to 4:00pm. Monday to Friday for three weeks. You pick the session that fits your school run.",
  },
  {
    q: "Does she need to bring anything?",
    a: "Just her lunch and a water bottle. All fabric, thread, tools, sketch pads, pencils, needles, machines, notions are included. No hidden shopping list.",
  },
  {
    q: "My daughter has never touched a sewing machine. Is that a problem?",
    a: "No. That is exactly who this is for. The first week is designed for total beginners. If she has already sewn before, she moves faster into design work in week 2.",
  },
  {
    q: "Is it safe? Who is supervising?",
    a: "Beulah is on site every day with two trained atelier assistants. Machines are supervised at all times. First aid on premises. Sign in and sign out is logged for every child.",
  },
  {
    q: "Sibling discount?",
    a: "Yes. ₦10,000 off the second child, ₦15,000 off the third. Message on WhatsApp to arrange.",
  },
  {
    q: "What if she hates it after day one?",
    a: "You get every naira you paid back. No questions, no forms. The refund guarantee is real and it holds for the first three days.",
  },
  {
    q: "Can I pay in full instead of the deposit?",
    a: "Yes. ₦55,000 upfront locks the slot and skips the follow up. Deposit is only there to make the yes easier today.",
  },
];

export default async function YoungDesignersPage() {
  const settings = await getSiteSettings();
  const formUrl = settings.summerAcademyFormUrl?.trim() || "";
  const hasForm = Boolean(formUrl);
  const primaryCta = hasForm ? formUrl : WHATSAPP_RESERVE_URL;
  const primaryCtaLabel = hasForm ? "Reserve Her Slot Now" : "Reserve Her Slot on WhatsApp";

  return (
    <>
      {/* HERO */}
      <section className="surface-navy-deep grain relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-10 -left-10 font-display italic leading-none text-cream/[0.05] pointer-events-none select-none text-[16rem] sm:text-[22rem] lg:text-[26rem]"
        >
          9-13
        </span>
        <div className="container-site relative z-10 py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-gold mb-5 inline-flex items-center gap-2.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span>Dé-light Fashion House presents</span>
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-1 text-cream mb-6 max-w-4xl">
              While every other girl on her street spends August scrolling,{" "}
              <em className="font-display italic text-gold font-medium">yours will walk out with a skill she keeps for life.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="body-lead text-cream-warm/85 max-w-2xl mb-9">
              Three weeks. Ages 9 to 13. Beulah's atelier in Eleyele, Ibadan. She arrives a child who scrolls. She leaves a child who designs, sketches, cuts, and sews. And you get to watch it happen from the front row of the showcase.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href={primaryCta} target="_blank" rel="noopener" className="btn btn-primary btn-attention w-full sm:w-auto group">
                {primaryCtaLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#offer" className="btn btn-ghost-cream w-full sm:w-auto">See what is included</a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mt-8 pt-8 border-t border-cream/10">
              <div>
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold font-bold mb-1">Dates</p>
                <p className="text-sm text-cream-warm/90">Aug 10 to 28, 2026</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold font-bold mb-1">Location</p>
                <p className="text-sm text-cream-warm/90">Eleyele, Ibadan</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold font-bold mb-1">Ages</p>
                <p className="text-sm text-cream-warm/90">9 to 13 years</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold font-bold mb-1">Slots left</p>
                <p className="text-sm text-crimson font-bold">Fewer than 20</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE PAIN */}
      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3 text-crimson">Read this if it stings</p>
            <h2 className="display-2 mb-6 text-balance">
              The 4am realisation every Nigerian mother is quietly trying to avoid.
            </h2>
          </Reveal>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-charcoal/85 max-w-2xl">
            <Reveal delay={0.05}>
              <p>
                You already know the summer is coming. You have already started dreading it. Because you know exactly how it goes.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="italic text-crimson-deep">
                By 11am she is not awake. By 2pm she has eaten one thing and is on the tablet. By 6pm she has not said ten words to another human being. By 9pm she is asking for airtime for TikTok.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                And this is the part that keeps you up. It is not the screen. It is what the screen is <strong>replacing</strong>. She used to build things. She used to draw. She used to have a spark in her eye when she talked about something she was making.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Now she rates other girls' outfits on TikTok. She has an opinion on everybody's dress but has never made her own. She wants to be a fashion designer, she says, sometimes. But she has never touched a needle. And nobody in her circle knows how to change that.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.28}>
            <div className="mt-12 bg-cream-warm border-l-4 border-crimson rounded-sm p-6 sm:p-8">
              <p className="eyebrow mb-4 text-crimson">The specific pains, out loud</p>
              <ul className="space-y-3">
                {PAIN_POINTS.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm sm:text-base text-charcoal/85 leading-relaxed">
                    <span className="text-crimson font-bold mt-1 flex-shrink-0" aria-hidden="true">→</span>
                    <span>{p.line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE 15 YEAR WINDOW */}
      <section className="surface-navy grain section text-cream">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow text-gold mb-3">The window nobody warns you about</p>
            <h2 className="display-2 text-cream mb-6 text-balance">
              Between 9 and 13, a girl decides who she is going to become. After 15, she mostly just decorates that person.
            </h2>
          </Reveal>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-cream-warm/85 max-w-2xl">
            <Reveal delay={0.05}>
              <p>
                The child development people call it the identity formation window. The years between 9 and 13 are when a girl's brain is actively searching for the thing she is good at. The thing that will become part of her self image for the rest of her life.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Miss the window and it does not close, exactly. It just gets much, much heavier to reopen. The 20 year old who says "I always wanted to try that but I do not think I am creative" is usually a 12 year old who was never handed the fabric.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-gold italic">
                Your daughter is inside the window right now. She will not be inside it forever. And every summer she spends inside a tablet is a summer the window is closing a little further.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                This is not doom. It is just biology. And it is exactly the reason this academy exists. Three weeks inside a real atelier, inside the window, is worth more than ten years of lessons booked after the window has quietly shut.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTRODUCING */}
      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">Introducing</p>
            <h2 className="display-1 mb-6 text-balance">
              The Dé-light Young Fashion Designers Summer Academy 2026.
            </h2>
            <p className="body-lead text-charcoal/75 max-w-2xl mb-8">
              Not a camp. Not a workshop. A three week apprenticeship in a working atelier in Eleyele, Ibadan, designed specifically for girls between 9 and 13 who have something creative inside them and nowhere to put it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="bg-cream-warm border border-charcoal/10 rounded-md p-6">
                <p className="eyebrow mb-3 text-crimson">Where</p>
                <p className="font-display text-2xl text-navy mb-1">Eleyele, Ibadan</p>
                <p className="text-sm text-charcoal/70">Beulah's own atelier. The same room where Lagos brides come for their fittings.</p>
              </div>
              <div className="bg-cream-warm border border-charcoal/10 rounded-md p-6">
                <p className="eyebrow mb-3 text-crimson">When</p>
                <p className="font-display text-2xl text-navy mb-1">Aug 10 to 28, 2026</p>
                <p className="text-sm text-charcoal/70">Three weeks. Monday to Friday. Morning or afternoon sessions, you pick.</p>
              </div>
              <div className="bg-cream-warm border border-charcoal/10 rounded-md p-6">
                <p className="eyebrow mb-3 text-crimson">Who teaches</p>
                <p className="font-display text-2xl text-navy mb-1">Beulah + team</p>
                <p className="text-sm text-charcoal/70">10 years dressing Lagos executives, brides, and aso ebi families. And two trained atelier assistants.</p>
              </div>
              <div className="bg-cream-warm border border-charcoal/10 rounded-md p-6">
                <p className="eyebrow mb-3 text-crimson">How many</p>
                <p className="font-display text-2xl text-navy mb-1">Only 20 girls</p>
                <p className="text-sm text-charcoal/70">Two sessions of 10. Small on purpose. Every child gets seen, every day.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* A DAY IN THE ACADEMY */}
      <section className="surface-cream-warm section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">What a day actually looks like</p>
            <h2 className="display-2 mb-8 text-balance">
              Three hours. Real atelier. Real hands. Real work.
            </h2>
          </Reveal>
          <div className="space-y-4">
            {[
              {
                time: "First 20 minutes",
                title: "Sketching",
                body: "Every day opens with a sketch. Not perfect, not judged. Just her pencil on her pad, warming up the muscle in her brain that turns an idea into a picture.",
              },
              {
                time: "40 minutes",
                title: "Design lesson",
                body: "One concept per day. How a peplum sits. Why a puff sleeve needs structure. What a dart does. Small, digestible, memorable.",
              },
              {
                time: "90 minutes",
                title: "Hands on with fabric",
                body: "Cutting, pinning, threading, sewing on a real industrial machine (age appropriate, fully supervised). This is where the skill actually lives.",
              },
              {
                time: "20 minutes",
                title: "Show and tell",
                body: "Every child holds up what she did. She names one thing she is proud of. The room claps. She goes home with something to talk about at dinner.",
              },
            ].map((slot, i) => (
              <Reveal key={i} delay={0.04 * (i + 1)}>
                <div className="bg-cream rounded-md border border-charcoal/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                  <div className="sm:w-40 flex-shrink-0">
                    <p className="eyebrow text-crimson mb-1">{slot.time}</p>
                    <p className="font-display text-xl text-navy">{slot.title}</p>
                  </div>
                  <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">{slot.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">Before you register</p>
            <h2 className="display-3 mb-8">Who this is for. Who it is not.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal delay={0.05}>
              <div className="bg-cream-warm rounded-md border border-charcoal/10 p-6 h-full">
                <p className="eyebrow text-crimson mb-3">This is for her if</p>
                <ul className="space-y-2.5 text-sm sm:text-base text-navy">
                  {FOR_HER.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-crimson font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-navy rounded-md border border-gold/20 p-6 text-cream h-full">
                <p className="eyebrow text-gold mb-3">This is not for her if</p>
                <ul className="space-y-2.5 text-sm sm:text-base text-cream-warm/90">
                  {NOT_FOR_HER.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-gold font-bold mt-0.5 flex-shrink-0">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE OFFER STACK */}
      <section id="offer" className="surface-navy-deep grain section text-cream">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow text-gold mb-3">Here is exactly what she gets</p>
            <h2 className="display-2 text-cream mb-4 text-balance">
              Six things that would cost you ₦300,000 if you tried to buy them separately.
            </h2>
            <p className="body-lead text-cream-warm/75 mb-10 max-w-2xl">
              We stack the whole thing into one price because a child's summer has one window, and no mother should be counting kobo when she is watching her daughter light up.
            </p>
          </Reveal>
          <div className="space-y-4">
            {REWARDS.map((r, i) => (
              <Reveal key={r.label} delay={0.05 * (i + 1)}>
                <div className="bg-navy/60 backdrop-blur border border-gold/15 rounded-md p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold text-navy font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-xl text-cream mb-1.5">{r.label}</p>
                    <p className="text-sm sm:text-base text-cream-warm/80 leading-relaxed">{r.detail}</p>
                  </div>
                  <div className="sm:text-right sm:w-32 flex-shrink-0">
                    <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold/70 font-bold mb-1">Value</p>
                    <p className="font-display text-lg text-gold">{r.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-10 bg-crimson/10 border border-gold/30 rounded-md p-6 sm:p-8 text-center">
              <p className="eyebrow text-gold mb-2">Total real value</p>
              <p className="font-display text-3xl sm:text-4xl text-cream mb-3">
                <span className="line-through text-cream-warm/40">₦300,000+</span>
              </p>
              <p className="eyebrow text-gold mb-2">Your investment today</p>
              <p className="font-display text-5xl sm:text-6xl text-gold mb-4">₦55,000</p>
              <p className="text-sm text-cream-warm/75 max-w-lg mx-auto">
                Only <strong className="text-gold">₦20,000 deposit</strong> to reserve her slot right now. The balance of ₦35,000 is due on the first day of class.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={primaryCta} target="_blank" rel="noopener" className="btn btn-gold w-full sm:w-auto group">
                {primaryCtaLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRIZES */}
      <section className="surface-cream-warm section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3 text-crimson">Prizes worth winning</p>
            <h2 className="display-3 mb-4">The three girls who show up hardest walk out with real atelier equipment.</h2>
            <p className="body-lead text-charcoal/75 mb-10 max-w-2xl">
              Not certificates in a frame. Actual tools of the trade. The kind that make a 12 year old realise she has been given the same equipment a real designer works with, and something clicks.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {PRIZES.map((p, i) => (
              <Reveal key={p.title} delay={0.05 * (i + 1)}>
                <div className="bg-cream rounded-md border border-charcoal/10 p-6 h-full">
                  <p className="font-display text-2xl text-navy mb-3">{p.title}</p>
                  <p className="text-sm text-charcoal/75 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="surface-cream section-tight">
        <div className="container-narrow">
          <Reveal>
            <div className="bg-navy rounded-md p-6 sm:p-10 border border-gold/30 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gold/10 blur-2xl" aria-hidden="true" />
              <p className="eyebrow text-gold mb-3">The three day promise</p>
              <h2 className="display-3 text-cream mb-4">If she hates it, you get every naira back.</h2>
              <p className="text-cream-warm/85 leading-relaxed max-w-2xl mb-3">
                Send her for the first three days. That is Monday, Tuesday, Wednesday of week one. If by Wednesday evening she tells you she does not want to go back, message Beulah on WhatsApp before Thursday morning and we refund every naira you paid.
              </p>
              <p className="text-cream-warm/85 leading-relaxed max-w-2xl mb-3">
                No forms. No questions. No pressure. No follow up sales calls. Just the refund and a wish that her next thing goes better.
              </p>
              <p className="text-gold italic text-sm">
                We can offer this because in ten years of teaching this age group in one on one settings, Beulah has never had a child ask to leave. The room does its own selling.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* URGENCY + SCARCITY */}
      <section className="surface-crimson section text-cream">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="eyebrow text-cream mb-3 opacity-90">Two things that will decide this for you</p>
            <h2 className="display-2 text-cream mb-8 text-balance">
              We can only take 20 girls. And registration closes on the 31st of July.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Reveal delay={0.05}>
              <div className="bg-cream/10 backdrop-blur border border-cream/20 rounded-md p-6">
                <p className="font-display text-5xl text-cream mb-2">20</p>
                <p className="eyebrow text-cream/85 mb-2">Total slots</p>
                <p className="text-sm text-cream/80">Two sessions of 10 each. When the 20th deposit lands, the page comes down. Slots have been going daily since WhatsApp announcement.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-cream/10 backdrop-blur border border-cream/20 rounded-md p-6">
                <p className="font-display text-5xl text-cream mb-2">Jul 31</p>
                <p className="eyebrow text-cream/85 mb-2">Registration closes</p>
                <p className="text-sm text-cream/80">Even if slots are still open, registration closes on the 31st of July, 2026, so we can order all fabric and materials in time. No exceptions.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <a href={primaryCta} target="_blank" rel="noopener" className="btn bg-cream text-crimson hover:bg-cream-warm w-full sm:w-auto group">
                {primaryCtaLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="surface-cream section">
        <div className="container-narrow">
          <Reveal>
            <p className="eyebrow mb-3">Every question a mother asks before she says yes</p>
            <h2 className="display-2 mb-8">FAQ.</h2>
          </Reveal>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={0.03 * (i + 1)}>
                <details className="bg-cream-warm border border-charcoal/10 rounded-md p-5 sm:p-6 group">
                  <summary className="cursor-pointer font-display text-lg text-navy list-none flex justify-between items-start gap-3">
                    <span>{f.q}</span>
                    <span className="text-crimson font-bold text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-sm sm:text-base text-charcoal/80 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="surface-navy-deep grain section">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="eyebrow text-gold mb-3">Last thing</p>
            <h2 className="display-1 text-cream mb-6 text-balance">
              She will have <em className="font-display italic text-gold font-medium">another</em> summer next year. But she will not be 10 again.
            </h2>
            <p className="body-lead text-cream-warm/85 max-w-2xl mx-auto mb-10">
              Every August that goes past inside a tablet is one August you cannot get back. Register her today. Let her August become the summer she talks about at 20.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <a href={primaryCta} target="_blank" rel="noopener" className="btn btn-primary btn-shine btn-attention w-full group">
                {primaryCtaLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href={WHATSAPP_ASK_URL} target="_blank" rel="noopener" className="btn btn-ghost-cream w-full">
                Have a question first? WhatsApp Beulah
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xs italic text-cream-warm/55 mt-10 max-w-md mx-auto">
              Call or WhatsApp: 07067132418 · Eleyele, Ibadan · Dé-light Fashion House
            </p>
          </Reveal>
        </div>
      </section>

      {/* Small soft footer link back to brand */}
      <section className="surface-cream-warm section-tight text-center">
        <div className="container-narrow">
          <Reveal>
            <p className="text-sm text-charcoal/70">
              Curious about the atelier your daughter would be walking into?{" "}
              <Link href="/our-story" className="text-crimson underline underline-offset-2 hover:text-crimson-deep">
                Read the Dé-light story
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
