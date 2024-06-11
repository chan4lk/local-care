import React from "react";
import { ITransaction } from "../types/electron-api";
import { ReportHeader } from "./ReportHeader";

interface PatientReportProps {
  transactions: ITransaction[];
}

const PatientReport: React.FC<PatientReportProps> = ({ transactions }) => {
  const mediumTime = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
    dateStyle: "long",
  });

  return (
    <div className="overflow-x-auto mt-8 mx-4">
      <ReportHeader />
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200 mb-8 border border-gray-300">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Patient Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Mobile
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Treatment
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Agreed Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Paid Amount
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Balance to Pay
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => {
              const agreedTotal = transaction.totalAmount ?? 0;
              const paidAmount = transaction.amount ?? 0;
              const balanceToPay = agreedTotal - paidAmount;

              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {transaction.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {transaction.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {transaction.treatment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    Rs. {agreedTotal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    Rs. {paidAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    Rs. {balanceToPay.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientReport;
