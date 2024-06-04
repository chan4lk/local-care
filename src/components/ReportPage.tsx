import React, { useState, useRef, useEffect } from "react";
import DailySummary from "./DailySummary"; // Ensure DailySummary is imported
import MonthlySummary from "./MonthlySummary";
import { ITransaction } from "../types/electron-api";
import { useReactToPrint } from "react-to-print";
import { Back } from "./BackButton";

const ReportPage = () => {
  const [showDailySummary, setShowDailySummary] = useState(false);
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [showMonthlySummary, setShowMonthlySummary] = useState(false);
  const dailySummaryRef = useRef<any>(null);
  const monthlySummaryRef = useRef<any>(null);

  useEffect(() => {
    const fetchDaily = async () => {
      const data = await window.electronAPI.fetchPaidByDateRange({
        start: new Date(),
        end: new Date(),
      });

      setTransactions(data);
    };

    const fetchMonthly = async () => {
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      const data = await window.electronAPI.fetchPaidByDateRange({
        start: startOfMonth,
        end: currentDate,
      });

      setTransactions(data);
    };

    if (showDailySummary) {
      fetchDaily();
    } else if (showMonthlySummary) {
      fetchMonthly();
    }

    return () => {
      setTransactions([]);
    };
  }, [showDailySummary, showMonthlySummary]);

  const handleToggleDailySummary = () => {
    setShowDailySummary((prevState) => !prevState);
  };

  const handleToggleMonthlySummary = () => {
    setShowMonthlySummary((prevState) => !prevState);
  };

  const handlePrintDailySummary = useReactToPrint({
    content: () => dailySummaryRef.current,
    trigger: () => <button style={{ display: "none" }}>Print</button>,
  });

  const handlePrintMonthlySummary = useReactToPrint({
    content: () => monthlySummaryRef.current,
    trigger: () => <button style={{ display: "none" }}>Print</button>,
  });

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center">
        <Back />
        <h1 className="text-3xl font-bold mt-8 mb-8 px-5 py-2"></h1>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleToggleDailySummary}
          className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
        >
          {showDailySummary ? "Hide Daily Summary" : "Show Daily Summary"}
        </button>
        <button
          onClick={handleToggleMonthlySummary}
          className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400 ml-4"
        >
          {showMonthlySummary ? "Hide Monthly Summary" : "Show Monthly Summary"}
        </button>
      </div>

      {showDailySummary && (
        <div
          className="flex flex-wrap justify-center mt-8"
          ref={dailySummaryRef}
        >
          <div className="w-full mt-4">
            {/* Render DailySummary component */}
            <DailySummary transactions={transactions} />
          </div>
        </div>
      )}
      {showMonthlySummary && (
        <div
          className="flex flex-wrap justify-center mt-8"
          ref={monthlySummaryRef}
        >
          <div className="w-full mt-4">
            <DailySummary transactions={transactions} />
          </div>
        </div>
      )}
      {showDailySummary && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrintDailySummary}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
          >
            Print Daily Summary
          </button>
        </div>
      )}
      {showMonthlySummary && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrintMonthlySummary}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
          >
            Print Monthly Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
