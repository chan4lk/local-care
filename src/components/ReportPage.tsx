import React, { useState, useRef, useEffect } from "react";
import DaySummary from "./DaySummary";
import MonthSummary from "./MonthSummary";
import { ITransaction } from "../types/electron-api";
import { useReactToPrint } from "react-to-print";
import { Back } from "./BackButton";

const ReportPage = () => {
  const [summaryType, setSummaryType] = useState("daily");
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const summaryRef = useRef<any>(null);

  useEffect(() => {
    const fetchTransactions = async (start: Date, end: Date) => {
      const data = await window.electronAPI.fetchPaidByDateRange({ start, end });
      setTransactions(data);
    };

    if (summaryType === "daily") {
      const today = new Date();
      fetchTransactions(today, today);
    } else if (summaryType === "monthly") {
      const selectedYear = new Date().getFullYear();
      const selectedMonth = new Date().getMonth();
      const startOfMonth = new Date(selectedYear, selectedMonth, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
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
      <div className="flex justify-center mt-4">
        <select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className=" p-4 bg-blue-100 rounded-lg shadow-md m-4 cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 text-center font-bold"
        >
          <option value="daily">Day Summary</option>
          <option value="monthly">Month Summary</option>
          <option value="custom">Custom Date Range</option>
        </select>
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
            <DaySummary transactions={transactions} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePrintSummary}
              className="w-1/4 p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 font-bold"
            >
              Print Summary
            </button>
          </div>
        </>
      )}
      {summaryType === "monthly" && (
        <>
          <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
              <MonthSummary transactions={transactions} />
            </div>
        
          <div className="flex justify-center">
            <button
              onClick={handlePrintSummary}
              className="w-1/4 p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 font-bold"
            >
              Print Summary
            </button>
          </div>
        </>
      )}
            {summaryType === "custom" && (
        <>
          <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
              <MonthSummary transactions={transactions} />
            </div>
        
          <div className="flex justify-center">
            <button
              onClick={handlePrintSummary}
              className="w-1/4 p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 font-bold"
            >
              Print Summary
            </button>
          </div>
        </>
      )}
      
    </div>
  );
};

export default ReportPage;
