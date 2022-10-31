// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions, waitFor, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { QueryClient, useIsRestoring } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import persister from "@/utils/persister";
import { Provider } from "jotai";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyle from "@/styles/global";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";
import { MemoryRouter } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

function Hidden({ children }: { children: React.ReactNode }) {
  const isRestoring = useIsRestoring();

  return (
    <>
      <span>{isRestoring ? "Restoring" : "Restored"}</span>
      {children}
    </>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
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
            <Hidden>{children}</Hidden>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    </PersistQueryClientProvider>
  );
}

const customRender = async (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  const result = render(ui, { wrapper: Providers, ...options });
  await waitFor(() => screen.findByText("Restored"));
  return result;
};

export { customRender as render };
