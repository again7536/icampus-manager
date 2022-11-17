import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import persister from "@/utils/persister";
import App from "@/popup/app";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "jotai";
import { Global } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/global";
import { AxiosError } from "axios";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { CircularProgress } from "@mui/material";

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

if (process.env.NODE_ENV === "production")
  Sentry.init({
    dsn: "https://8dd7e97aae254e40aefb19f1d554eeac@o4504121681641472.ingest.sentry.io/4504121692651520",
    integrations: [new BrowserTracing()],
    release: "icampus-manager@1.1.0.2",
    tracesSampleRate: 1.0,
  });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
      suspense: true,
      retry: (failureCount, error) => {
        if ((error as AxiosError).response?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,
      }}
    >
      <Provider>
        <Global styles={GlobalStyle} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MemoryRouter>
            <Suspense fallback={<CircularProgress />}>
              <App />
            </Suspense>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    </PersistQueryClientProvider>
  </StrictMode>
);
