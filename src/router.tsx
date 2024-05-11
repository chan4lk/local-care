import React from "react";
import { Root } from "./routes/Root";
import { createBrowserRouter } from "react-router-dom";
import NewPatient from "./routes/NewPatient";
import ExistingPatient from "./routes/ExistingPatient";

export const router = createBrowserRouter([
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
