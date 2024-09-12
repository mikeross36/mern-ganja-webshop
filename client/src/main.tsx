import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContextProvider.tsx";
import { AuthContextProvider } from "./contexts/AuthContextProvider.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthMiddleware from "./middleware/AuthMiddleware.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./shopping-cart-state/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Layout from "./pages/Layout";
import { ERoutes } from "./types";
import AuthPage from "./pages/AuthPage";
import VerifyAccount from "./components/VerifyAccount";
import GanjaDetails from "./pages/ganjas/GanjaDetails";
import FAQ from "./pages/faq/FAQ";
import MakeOrder from "./pages/MakeOrder";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import OrderPage from "./pages/OrderPage";
import UserOrders from "./pages/UserOrders";
import ResetPassword from "./components/ResetPassword";
import UserAccount from "./pages/user-account/UserAccount";
import UpdateAccount from "./pages/user-account/UpdateAccount";
import UpdatePassword from "./pages/user-account/UpdatePassword";
import Category from "./pages/Category.tsx";

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const initialOptions = {
  clientId: clientId,
  currency: "EUR",
  intent: "capture",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  },
});

const router = createBrowserRouter([
  {
    path: ERoutes.home,
    element: <Layout />,
  },
  {
    path: ERoutes.authpage,
    element: <AuthPage />,
  },
  {
    path: `${ERoutes.verify}/:userId/:verificationCode`,
    element: <VerifyAccount />,
  },
  {
    path: `${ERoutes.category}/:id`,
    element: <Category />,
  },
  {
    path: `${ERoutes.ganjas}/:id`,
    element: <GanjaDetails />,
  },
  {
    path: ERoutes.faq,
    element: <FAQ />,
  },
  {
    path: ERoutes.makeorder,
    element: <MakeOrder />,
  },
  {
    path: ERoutes.shipping,
    element: <ShippingPage />,
  },
  {
    path: ERoutes.payment,
    element: <PaymentPage />,
  },
  {
    path: `${ERoutes.order}/:id`,
    element: <OrderPage />,
  },
  {
    path: ERoutes.userorders,
    element: <UserOrders />,
  },
  {
    path: `${ERoutes.resetpassword}/:resetToken`,
    element: <ResetPassword />,
  },
  {
    path: ERoutes.useraccount,
    element: <UserAccount />,
    children: [
      {
        path: "update-account",
        element: <UpdateAccount />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions} deferLoading={true}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AuthContextProvider>
            <Provider store={store}>
              <PersistGate loading={<Loader />} persistor={persistor}>
                <AuthMiddleware>
                  <RouterProvider router={router} />
                  <App />
                </AuthMiddleware>
              </PersistGate>
            </Provider>
          </AuthContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AppContextProvider>
      </QueryClientProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
