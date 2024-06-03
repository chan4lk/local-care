import React, { useState, useEffect } from 'react';
import { IPatient, ITransactionStatus, PaymentMethod } from '../types/electron-api';

interface DailySummaryProps {
  patients: IPatient[];
}

const DailySummary: React.FC<DailySummaryProps> = ({ patients }) => {
  const [totalCash, setTotalCash] = useState<number>(0);
  const [totalCard, setTotalCard] = useState<number>(0);

  useEffect(() => {
    let cashTotal = 0;
    let cardTotal = 0;

    patients.forEach(patient => {
      patient.invoice.transactions.forEach(transaction => {
        if (transaction.status === ITransactionStatus.Paid) {
          if (transaction.paymentMethod === PaymentMethod.Cash) {
            cashTotal += transaction.amount;
          } else if (transaction.paymentMethod === PaymentMethod.Card) {
            cardTotal += transaction.amount;
          }
        }
      });
    });

    setTotalCash(cashTotal);
    setTotalCard(cardTotal);
  }, [patients]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Daily Summary</h2>
      
      {/* Summary Table */}
      <table className="min-w-full divide-y divide-gray-200 mb-8">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient, index) => {
            const totalPaid = patient.invoice.transactions
              .filter(t => t.status === ITransactionStatus.Paid)
              .reduce((sum, t) => sum + t.amount, 0);

            const balanceDue = patient.invoice.total - totalPaid;
            const lastTransaction = patient.invoice.transactions.find(t => t.status === ITransactionStatus.Paid);

            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lastTransaction?.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalPaid.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.invoice.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{balanceDue.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Total Payments */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold">Total Cash Payments: Rs. {totalCash.toFixed(2)}</h3>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold">Total Card Payments: Rs. {totalCard.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default DailySummary;
