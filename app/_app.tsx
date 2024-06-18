import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Refine, Authenticated, AuthProvider } from "@refinedev/core";
import RefineSnackbarProvider, { ThemedLayoutV2 } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import { useNotificationProvider } from "@refinedev/antd";
import { BrowserRouter } from "react-router-dom";

const API_URL = "/api";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", "true");
      return Promise.resolve();
    }
    return Promise.reject();
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkError: async () => Promise.resolve(),
  checkAuth: async () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  getPermissions: async () => Promise.resolve(),
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RefineSnackbarProvider>
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "products",
              list: "/products",
              create: "/products/new",
              edit: "/products/:id/edit",
              show: "/products/:id",
            },
          ]}
        >
          <Component {...pageProps} />
        </Refine>
      </BrowserRouter>
    </RefineSnackbarProvider>
  );
}

export default MyApp;
