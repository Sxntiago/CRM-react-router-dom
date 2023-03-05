import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NewClient, { action as newClientAction } from "./pages/newclient";
import Index, { loader as clientsLoader } from "./pages/index";
import ErrorPage from "./pages/ErrorPage";
import EditCustomer, {
  loader as editLoaderCustomer,
  action as editActionCustomer,
} from "./pages/editcustomer";
import { action as deleteActionCustomer } from "./components/Customer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/client/new",
        element: <NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/client/:customerId/edit",
        element: <EditCustomer />,
        loader: editLoaderCustomer,
        errorElement: <ErrorPage />,
        action: editActionCustomer,
      },
      {
        path: "/client/:customerId/destroy",
        action: deleteActionCustomer,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
