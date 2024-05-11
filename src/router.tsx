import React from "react";
import { Root } from "./routes/Root";
import { createHashRouter } from "react-router-dom";
import NewPatient from "./routes/NewPatient";
import ExistingPatient from "./routes/ExistingPatient";

export const router = createHashRouter([
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
