import Link from "next/link";

export default function NotFound() {
  return (
    <section className="surface-cream section text-center min-h-[60vh] flex items-center">
      <div className="container-narrow">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display-2 mb-5">This look has not been built yet.</h1>
        <p className="body-lead text-charcoal/70 mb-8 max-w-lg mx-auto">
          The page you were looking for has moved or never existed. Browse Fashion Inspo for the looks Beulah is
          actually building, or message her directly on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/fashion-inspo" className="btn btn-primary">Browse Fashion Inspo</Link>
          <Link href="/" className="btn btn-ghost">Back home</Link>
        </div>
      </div>
    </section>
  );
}
