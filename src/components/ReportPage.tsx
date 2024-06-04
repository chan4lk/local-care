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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
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
      const startOfMonth = new Date(selectedYear, selectedMonth, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
      fetchTransactions(startOfMonth, endOfMonth);
    } else if (summaryType === "custom") {
      fetchTransactions(startDate, endDate);
    } else if (summaryType === "all") {
      const start = new Date(0); 
      const end = new Date();
      fetchTransactions(start, end);
    }

    return () => {
      setTransactions([]);
    };
  }, [summaryType, startDate, endDate, selectedYear, selectedMonth]);

  const handlePrintSummary = useReactToPrint({
    content: () => summaryRef.current,
    trigger: () => <button style={{ display: "none" }}>Print</button>,
  });

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center">
        <Back />
      </div>

<div className="flex justify-center mb-4">
        <select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className="px-4 py-2 bg-blue-300 text-black font-bold rounded-md hover:bg-blue-100 focus:outline-none focus:bg-blue-200 text-center"
        >
          <option value="all">All Summaries</option>
          <option value="daily">Day Summary</option>
          <option value="monthly">Month Summary</option>
          <option value="custom">Custom Date Range</option>
        </select>
      </div>      {summaryType === "custom" && (
        <div className="flex justify-center mb-4">
          <input
            type="date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400 mr-4"
          />
          <input
            type="date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
          />
        </div>
      )}

      {summaryType === "monthly" && (
        <div className="flex justify-center mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400 mr-4"
          >
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </div>
      )}

      {summaryType === "monthly" && (
        <>
          <div className="flex flex-wrap justify-center mt-8" ref={summaryRef}>
            <div className="w-full mt-4">
              <MonthSummary transactions={transactions} />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrintSummary}
              className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
            >
              Print Summary
            </button>
          </div>
        </>
      )}
      {summaryType === "daily" && (
        <>
          <div className="flex flex-wrap justify-center mt-8" ref={summaryRef}>
            <div className="w-full mt-4">
              <DaySummary transactions={transactions} />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrintSummary}
              className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
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
