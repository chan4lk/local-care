import React from "react";
import { createHashRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import NewPatient from "./routes/NewPatientContainer";
import ExistingPatient from "./routes/ExistingPatientContainer";
import ReportPageContainer from "./routes/ReportPageContainer";
import DueReportContainer from "./routes/DueReportContainer";
import PatientReportContainer from "./routes/PatientReportContainer";
import { Reports } from "./components/Reports";

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
    element: <DueReportContainer />,
  },
  {
    path: "/report/patients",
    element: <PatientReportContainer />,
  },
]);

export default router; // Export the router variable
