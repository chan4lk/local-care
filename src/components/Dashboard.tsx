<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> main
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  
  const goToNew = () => navigate(`/new`);
  const goToExisting = () => navigate(`/existing`);
  const handleViewReport = () => {
    navigate(`/report`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center text-center">
                <div className="w-3/4 p-4 bg-white-100 rounded-lg  hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-900 mb-8">
                    <h1 className="text-4xl font-bold"> Rosewood Dental & Medical Hospital</h1>
                </div>
            </div>

      <div className="flex flex-wrap justify-center text-center">
        <div
          className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-md  cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800"
          onClick={goToNew}
        >
          <h2 className="text-lg font-bold">New Patient</h2>
          <p className="text-sm">Create a new record.</p>
        </div>
        <div
          className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-md m-4 cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800"
          onClick={goToExisting}
        >
          <h2 className="text-lg font-bold">Existing Patient</h2>
          <p className="text-sm">Update existing record.</p>
        </div>
        <div
          className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800"
          onClick={handleViewReport}
        >
          <h2 className="text-lg font-bold">View Reports</h2>
          <p className="text-sm">Daily & Monthly Summaries</p>

        </div>
      </div>
    </div>
  );
};
