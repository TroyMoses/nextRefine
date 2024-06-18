import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Refine, Authenticated, AuthProvider } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import { useNotificationProvider } from "@refinedev/antd";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
  } from "@refinedev/react-router-v6";

const API_URL = "/api";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", "true");
      return Promise.resolve({ success: true });
    }
    return Promise.reject({ success: false });
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return Promise.resolve({ success: true });
  },
  check: async () => {
    return localStorage.getItem("auth") ? Promise.resolve({ authenticated: true }) : 
    Promise.reject({ authenticated: false });
  },
  getPermissions: async () => Promise.resolve({ success: true }),
  onError: async (error) => {
    console.error(error);
    return Promise.resolve({ redirectTo: "/login" });
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider(API_URL)}
          notificationProvider={useNotificationProvider}
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
    </SnackbarProvider>
  );
}

export default MyApp;
