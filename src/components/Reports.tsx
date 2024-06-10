import { useNavigate } from "react-router-dom";

export const Reports = () => {
  const navigate = useNavigate();
  
  const gotPayments = () => navigate(`/report/paid`);
  const gotoDueBalances = () => navigate(`/report/due`);
  const gotoPatientReport = () => {
    navigate(`/report/patients`);
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
          onClick={gotPayments}
        >
          <h2 className="text-lg font-bold">Past Payments</h2>
          <p className="text-sm">View cash and card payments.</p>
        </div>
        <div
          className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-md m-4 cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800"
          onClick={gotoDueBalances}
        >
          <h2 className="text-lg font-bold">Due Balances</h2>
          <p className="text-sm">View current due payments.</p>
        </div>
        <div
          className="w-1/2 p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800"
          onClick={gotoPatientReport}
        >
          <h2 className="text-lg font-bold">Patients</h2>
          <p className="text-sm">View all patients.</p>

        </div>
      </div>
    </div>
  );
};
