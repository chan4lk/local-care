import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import DailySummary from "./DailySummary";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [showDailySummary, setShowDailySummary] = useState(false);
  const dailySummaryRef = useRef();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          throw new Error("Failed to fetch patients data");
        }
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatients();
  }, []);

  const goToNew = () => navigate(`/new`);
  const goToExisting = () => navigate(`/existing`);

  const handleToggleDailySummary = () => {
    setShowDailySummary(prevState => !prevState);
  };

  const handlePrintDailySummary = useReactToPrint({
    content: () => dailySummaryRef.current,
    trigger: () => <button ref={printButtonRef} style={{ display: 'none' }}>Print</button>
  });

  const printButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container w-full">
      <div className="flex flex-wrap justify-center mt-4">
        <h1 className="text-3xl font-bold mb-4">Rosewood Dental & Medical Hospital</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        <div
          className="w-1/2 p-4 bg-white rounded shadow-md m-4 cursor-pointer"
          onClick={goToNew}
        >
          <h2 className="text-lg font-bold">New Patient</h2>
          <p className="text-sm">Create a new record.</p>
        </div>
        <div
          className="w-1/2 p-4 bg-white rounded shadow-md m-4 cursor-pointer"
          onClick={goToExisting}
        >
          <h2 className="text-lg font-bold">Existing Patient</h2>
          <p className="text-sm">Update existing record.</p>
        </div>
        </div>

      


<div className="flex justify-center">
  <button
    onClick={handleToggleDailySummary}
    className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
  >
    {showDailySummary ? "Hide Daily Summary" : "Show Daily Summary"}
  </button>
</div>


      

      {showDailySummary && (
        <div className="flex flex-wrap justify-center mt-8" ref={dailySummaryRef}>
          <div className="w-full mt-4">
            <DailySummary patients={patients} />
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
    </div>
  );
};