import React from "react";
import { Root } from "./routes/Root";
import { createHashRouter } from "react-router-dom";
import NewPatient from "./routes/NewPatientContainer";
import ExistingPatient from "./routes/ExistingPatientContainer";

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
