import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/AuthContext";
import { AuthGuard } from "../HOC/AuthGuard";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AuthProvider>
        {/* if requireAuth property is present - protect the page */}
        {Component.requireAuth ? (
          <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
