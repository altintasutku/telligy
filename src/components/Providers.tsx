"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";

interface ProvidersProps extends ThemeProviderProps {}

const Providers = ({ children, ...props }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeRef.current}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
