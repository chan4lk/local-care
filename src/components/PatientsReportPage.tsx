import {useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Back } from "./BackButton";
import { PrintButton } from "./PrintButton";
import PatientReport from "./report/PatientReport";

const ReportPage = () => {
  const summaryRef = useRef<any>(null);
  const handlePrintSummary = useReactToPrint({
    content: () => summaryRef.current,
    trigger: () => <button style={{ display: "none" }}>Print</button>,
  });

  return (
    <div className="container mx-auto">
      <Back />
      <div className="flex mt-2 justify-between">
        <div className="relative flex">
        </div>
        <PrintButton handlePrintSummary={handlePrintSummary} />
      </div>
          <div className="flex justify-center mx-auto mt-auto" ref={summaryRef}>
            <PatientReport/>
          </div>
    </div>
  );
};

export default ReportPage;