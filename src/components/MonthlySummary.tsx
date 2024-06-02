import React from 'react';
import { IPatient, ITransactionStatus } from '../types/electron-api';

interface MonthlySummaryProps {
  patients: IPatient[];
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ patients }) => {
  const cashPayments = patients.filter(p => 
    p.invoice.transactions.some(t => t.description.includes("Cash"))
  );

  const cardPayments = patients.filter(p => 
    p.invoice.transactions.some(t => t.description.includes("Card"))
  );

  const totalCash = cashPayments.reduce((sum, p) => 
    sum + (p.invoice.transactions.find(t => t.description.includes("Cash"))?.amount || 0), 0
  );

  const totalCard = cardPayments.reduce((sum, p) => 
    sum + (p.invoice.transactions.find(t => t.description.includes("Card"))?.amount || 0), 0
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mobile
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount Paid
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Payment
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient) => (
            <tr key={patient.patientRegistrationId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.fullname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.mobile}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.invoice.transactions.find(t => t.status === ITransactionStatus.Paid)?.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.invoice.transactions.find(t => t.status === ITransactionStatus.Paid)?.description.split(' ')[2]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.invoice.total}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Total Cash Payments:
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Rs. {totalCash.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Total Card Payments:
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Rs. {totalCard.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MonthlySummary;
