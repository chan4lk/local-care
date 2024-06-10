import React from "react";
import { createHashRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import NewPatient from "./routes/NewPatientContainer";
import ExistingPatient from "./routes/ExistingPatientContainer";
import ReportPageContainer from "./routes/ReportPageContainer";
import { IPatient } from './types/electron-api'; // Import IPatient type if needed
import { Reports } from "./components/Reports";

const patients: IPatient[] = []; // Assuming patients data is available here

const router = createHashRouter([
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
  {
    path: "/report",
    element: <Reports />,
  },
  {
    path: "/report/paid",
    element: <ReportPageContainer />,
  },
  {
    path: "/report/due",
    element: <ReportPageContainer />,
  },
  {
    path: "/report/patients",
    element: <ReportPageContainer />,
  },
]);

export default router; // Export the router variable
