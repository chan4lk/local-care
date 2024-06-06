import React from "react";
import ReportPage from "../components/ReportPage";
import Layout from "../components/Layout";
import { IPatient } from '../types/electron-api';

// Define the props interface
interface ReportPageContainerProps {
  patients: IPatient[];
}

// Define the component
const ReportPageContainer: React.FC<ReportPageContainerProps> = ({ patients }) => {
  // Add a return statement and wrap the JSX elements in parentheses
  return (
    <Layout>
      <ReportPage />
    </Layout>
  );
};

export default ReportPageContainer;
