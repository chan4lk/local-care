import React, { useState, useRef, useEffect } from "react";
import DaySummary from "./report/DaySummary";
import { ITransaction } from "../types/electron-api";
import { useReactToPrint } from "react-to-print";
import { Back } from "./BackButton";
import PatientReport from "./report/PatientReport";

const ReportPage = () => {
  const [summaryType, setSummaryType] = useState("daily");
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const summaryRef = useRef<any>(null);

  useEffect(() => {
    const fetchTransactions = async (start: Date, end: Date) => {
      const data = await window.electronAPI.fetchPaidByDateRange({ start, end });
      console.log("summary", summaryType, start, end, data);
      setTransactions(data);
    };

    if (summaryType === "daily") {
      const today = new Date();
      fetchTransactions(today, today);
    } else if (summaryType === "monthly") {
      const startOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const endOfMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
      fetchTransactions(startOfMonth, endOfMonth);
    } else if (summaryType === "custom") {
      fetchTransactions(startDate, endDate);
    }
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
            className="flex items-center p-4 bg-blue-100 rounded-lg shadow-md m-4 cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 font-bold"
          >
            <option value="daily">Day Summary</option>
            <option value="monthly">Month Summary</option>
            <option value="report">Patient Reports</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
            </svg>
          </div>
        </div>
        <button
          onClick={handlePrintSummary}
          className="flex items-center p-4 bg-blue-100 rounded-lg shadow-md m-4 cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 font-bold"
        >
          <svg className="w-6 h-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 20h4v-4h2v4c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2v-4h2v4h4v-8H4l8-8 8 8h-6z" />
          </svg>
          <span>Print Summary</span>
        </button>
      </div>

      {summaryType === "daily" && (
        <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
          <DaySummary transactions={transactions} />
        </div>
      )}
{summaryType === "monthly" && (
  <>
    <div className="flex flex-col items-center mx-auto mt-4">
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-900 font-bold" style={{ width: "100px" }}>Start Month:</label>
        <input
          type="month"
          value={`${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}`}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-blue-100 hover:bg-green-100"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-900 font-bold" style={{ width: "100px" }}>End Month:</label>
        <input
          type="month"
          value={`${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}`}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-blue-100 hover:bg-green-100"
        />
      </div>
    </div>

    <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
      <DaySummary transactions={transactions} />
    </div>
  </>
)}


      {summaryType === "report" && (
        <div className="flex justify-center mx-auto mt-4" ref={summaryRef}>
          <PatientReport transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default ReportPage;
