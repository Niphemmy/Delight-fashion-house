"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CheckoutContext {
  pinName?: string;
  pinUrl?: string;
  archetype?: string;
  source?: string;
  intent?: "order" | "consult" | "general";
}

interface ModalState {
  openCheckout: (ctx?: CheckoutContext) => void;
  closeCheckout: () => void;
  openArchetype: () => void;
  closeArchetype: () => void;
  checkoutOpen: boolean;
  archetypeOpen: boolean;
  checkoutContext: CheckoutContext;
}

const ModalContext = createContext<ModalState | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [archetypeOpen, setArchetypeOpen] = useState(false);
  const [checkoutContext, setCheckoutContext] = useState<CheckoutContext>({});

  const openCheckout = useCallback((ctx: CheckoutContext = {}) => {
    setCheckoutContext(ctx);
    setCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);
  const openArchetype = useCallback(() => setArchetypeOpen(true), []);
  const closeArchetype = useCallback(() => setArchetypeOpen(false), []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    const open = checkoutOpen || archetypeOpen;
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen, archetypeOpen]);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCheckoutOpen(false);
        setArchetypeOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      openCheckout,
      closeCheckout,
      openArchetype,
      closeArchetype,
      checkoutOpen,
      archetypeOpen,
      checkoutContext,
    }),
    [openCheckout, closeCheckout, openArchetype, closeArchetype, checkoutOpen, archetypeOpen, checkoutContext]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal(): ModalState {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
