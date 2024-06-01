import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import DailySummary from "./DailySummary";
import MonthlySummary from "./MonthlySummary"; // Import MonthlySummary component

export const Dashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  
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
  const handleViewReport = () => {
    navigate(`/report`);
  };

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
        <div
          className="w-1/2 p-4 bg-white rounded shadow-md m-4 cursor-pointer"
          onClick={handleViewReport}
        >
          <h2 className="text-lg font-bold">View Reports</h2>
        </div>
      </div>

    
    </div>
  );
};
