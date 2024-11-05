import React, { useState, useRef, useEffect } from "react";
import DaySummary from "./report/DaySummary";
import { ITransaction } from "../types/electron-api";
import { useReactToPrint } from "react-to-print";
import { Back } from "./BackButton";
import { PrintButton } from "./PrintButton";

const ReportPage = () => {
  const [summaryType, setSummaryType] = useState("daily");
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const summaryRef = useRef<any>(null);

  useEffect(() => {
    const fetchTransactions = async (start: Date, end: Date) => {
      const data = await window.electronAPI.fetchPaidByDateRange({
        start,
        end,
      });
      setTransactions(data);
    };
    const today = new Date();
    if (summaryType === "daily") {
      fetchTransactions(today, today);
    } else if (summaryType === "monthly") {
      const selectedYear = today.getFullYear();
      const selectedMonth = today.getMonth();
      const startOfMonth = new Date(selectedYear, selectedMonth, 1);
      const endOfMonth = today;
      fetchTransactions(startOfMonth, endOfMonth);
    } else if (summaryType === "custom") {
      fetchTransactions(startDate, endDate);
    }
    return () => {
      setTransactions([]);
    };
  }, [summaryType, startDate, endDate]);

  const handlePrintSummary = useReactToPrint({
    content: () => summaryRef.current,
    trigger: () => <button style={{ display: "none" }}>Print</button>,
  });

  return (
    <div className="container mx-auto">
      <Back />
      <div className="flex mt-2 justify-between">
        <div className="relative flex">
          <select
            value={summaryType}
            onChange={(e) => setSummaryType(e.target.value)}
            className="p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 text-center font-bold appearance-none"
          >
            <option value="daily">Day Summary</option>
            <option value="monthly">Month Summary</option>
            <option value="custom">Custom Date Range</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
            </svg>
          </div>
        </div>
        <PrintButton handlePrintSummary={handlePrintSummary} />
      </div>

      {summaryType === "custom" && (
        <div className="flex justify-center mb-4">
          <input
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-100 focus:outline-none focus:bg-blue-100 mr-4"
          />
          <input
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
          />
        </div>
      )}
      {summaryType === "daily" && (
        <>
          <div className="flex justify-center mx-auto mt-auto" ref={summaryRef}>
            <DaySummary transactions={transactions} title="Dialy Payments Report"/>
          </div>
        </>
      )}

      {summaryType === "monthly" && (
        <>
          <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
            <DaySummary transactions={transactions} title="Monthly Payments Report"/>
          </div>
        </>
      )}
      {summaryType === "custom" && (
        <>
          <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
            <DaySummary transactions={transactions} title="Payments Report"/>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPage;