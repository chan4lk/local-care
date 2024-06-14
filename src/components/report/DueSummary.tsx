import React from "react";
import {
  ITransaction,
} from "../../types/electron-api";
import { ReportHeader } from "./ReportHeader";
import { formatDate } from "../../database/helper";

interface DueSummaryProps {
  transactions: ITransaction[];
  title: string;
}

const DueSummary: React.FC<DueSummaryProps> = ({ transactions, title }) => {
  return (
    <div className="overflow-x-auto mt-8 mx-4">
      <ReportHeader title={title}/>
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200 mb-8 border border-gray-300">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Patient Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Updated On
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">
                Amount Pending
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => {
              const totalPaid = transaction.amount ?? 0;

              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {transaction.name}
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {formatDate(transaction.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                  Rs. {transaction.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right border border-gray-300">
                    Rs. {totalPaid.toFixed(2)}
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

export default DueSummary;
