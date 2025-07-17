"use client";

import { ToastProvider } from "@heroui/react";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
      <NextUIProvider>
        <ToastProvider />
        {children}
      </NextUIProvider>
  );
}
