import ReportPage from "../components/ReportPage";
import Layout from "../components/Layout";
import { IPatient } from '../types/electron-api'; // Import IPatient type if needed

const ReportPageContainer = ({ patients }: { patients: IPatient[] }) => (
  <Layout>
    <ReportPage patients={patients} />
  </Layout>
);

export default ReportPageContainer;
