"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { queryClient as sharedClient } from "./query-client";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => sharedClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
