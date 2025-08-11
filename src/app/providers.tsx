"use client";

import * as React from "react";
import { ToastProvider } from "@heroui/react";
import {HeroUIProvider} from "@heroui/system";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {

  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
