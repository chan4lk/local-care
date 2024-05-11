import { createRoot } from "react-dom/client";
import { Root } from "./routes/Root";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import NewPatient from "./routes/NewPatient";
import ExistingPatient from "./routes/ExistingPatient";

addRxPlugin(RxDBDevModePlugin);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/new",
    element: <NewPatient />,
  },
  {
    path: "/existing",
    element: <ExistingPatient />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
