import React from "react";
import { createHashRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import NewPatient from "./routes/NewPatientContainer";
import ExistingPatient from "./routes/ExistingPatientContainer";
import ReportPageContainer from "./routes/ReportPageContainer";
<<<<<<< HEAD
import DueReportContainer from "./routes/DueReportContainer";
import PatientReportContainer from "./routes/PatientReportContainer";
import { Reports } from "./components/Reports";

=======
import { IPatient } from './types/electron-api'; // Import IPatient type if needed

const patients: IPatient[] = []; // Assuming patients data is available here

>>>>>>> main
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
<<<<<<< HEAD
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
=======
    element: <ReportPageContainer patients={patients} />,
>>>>>>> main
  },
]);

export default router; // Export the router variable
