import {useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Back } from "./BackButton";
import { PrintButton } from "./PrintButton";
import { ITransaction } from "../types/electron-api";
import DueSummary from "./report/DueSummary";

const ReportPage = () => {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const summaryRef = useRef<any>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await window.electronAPI.fetchPendingTransactions();
      setTransactions(data);
    };

    fetchTransactions();
    
    return () => {
      setTransactions([]);
    };
  }, []);
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
            <DueSummary transactions={transactions} title="Due Payments Report"/>
          </div>
    </div>
  );
};

export default ReportPage;