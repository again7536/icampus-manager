import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import persister from "@/utils/persister";
import App from "@/popup/app";
import { MemoryRouter } from "react-router-dom";

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </PersistQueryClientProvider>
  </StrictMode>
);
