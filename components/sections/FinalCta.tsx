"use client";

import { useModal } from "@/components/ModalProvider";

export function FinalCta() {
  const { openCheckout } = useModal();
  return (
    <section className="surface-crimson grain section text-center">
      <div className="container-narrow">
        <h2 className="display-2 text-ivory mb-5 max-w-3xl mx-auto text-balance">Stop saving. Start wearing.</h2>
        <p className="text-lg text-ivory/85 max-w-xl mx-auto mb-9 leading-relaxed pretty-text">
          The look you have been pinning is two steps away. Save it to your email, then send the message that
          starts your wardrobe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={() => openCheckout({ source: "final-cta", intent: "general" })}
            className="btn bg-navy text-cream hover:bg-navy-deep w-full sm:w-auto"
          >
            Save Your Look + Continue to WhatsApp
          </button>
          <button
            type="button"
            onClick={() => openCheckout({ source: "final-cta-consult", intent: "consult" })}
            className="text-ivory underline underline-offset-4 hover:text-cream font-semibold tracking-cta text-sm"
          >
            Or book a Style Consult instead
          </button>
        </div>
      </div>
    </section>
  );
}
