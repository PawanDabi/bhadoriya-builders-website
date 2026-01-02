"use client";

import { ContactModalProvider } from "@/contexts/ContactModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ContactModalProvider>{children}</ContactModalProvider>;
}
