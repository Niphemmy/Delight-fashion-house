"use client";

import { useEffect } from "react";
import { useModal } from "./ModalProvider";
import { track } from "@/lib/pixel";

export function PinPageActions({ pinName, pinUrl }: { pinName: string; pinUrl: string }) {
  const { openCheckout } = useModal();

  useEffect(() => {
    track("ViewContent", { content_name: pinName, content_type: "pin" });
  }, [pinName]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <button
        type="button"
        onClick={() => openCheckout({ pinName, pinUrl, source: "pin-detail", intent: "order" })}
        className="btn btn-primary flex-1"
      >
        Save This Look + Continue to WhatsApp
      </button>
      <button
        type="button"
        onClick={() => openCheckout({ pinName, pinUrl, source: "pin-detail-consult", intent: "consult" })}
        className="btn btn-ghost flex-1"
      >
        Book a Style Consult
      </button>
    </div>
  );
}
