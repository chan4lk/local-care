import React, { useState, useEffect } from 'react';
import { ITransaction, ITransactionStatus, PaymentMethod } from '../types/electron-api';

interface DailySummaryProps {
  transactions: ITransaction[];
}

const MonthSummary: React.FC<DailySummaryProps> = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [totalcash, setTotalcash] = useState<number>(0);
  const [totalcard, setTotalcard] = useState<number>(0);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    // Filter transactions based on the selected month and year
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
    });
    setFilteredTransactions(filtered);
  }, [transactions, selectedMonth, selectedYear]);

  useEffect(() => {
    // Calculate total cash and card payments for the filtered transactions
    let cashTotal = 0;
    let cardTotal = 0;
    filteredTransactions.forEach(transaction => {
      if (transaction.status === ITransactionStatus.Paid) {
        if (transaction.paymentMethod === PaymentMethod.cash) {
          cashTotal += transaction.amount;
        } else if (transaction.paymentMethod === PaymentMethod.card) {
          cardTotal += transaction.amount;
        }
      }
    });
    setTotalcash(cashTotal);
    setTotalcard(cardTotal);
  }, [filteredTransactions]);

  // Calculate total of all payments
  const totalAll = totalcash + totalcard;

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value);
    setSelectedMonth(month);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="overflow-x-auto mt-8 mx-4">
      <div className="flex flex-wrap justify-center text-center">
        <div className="w-full p-4 bg-blue-100 rounded-lg shadow-md hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 mb-8">
          <h2 className="text-2xl font-bold">Rosewood Dental & Medical Hospital</h2>
          <p className="text-sm">{formattedDate}</p>
          <div className="flex">
            <select className="mt-2 mr-4" value={selectedMonth} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>{new Date(currentDate.getFullYear(), i).toLocaleString('en-US', { month: 'long' })}</option>
              ))}
            </select>
            <select className="mt-2" value={selectedYear} onChange={handleYearChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={currentDate.getFullYear() - i}>{currentDate.getFullYear() - i}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="table-container"> {/* Container for table and total payments */}
        {/* Summary Table */}
        <table className="min-w-full divide-y divide-gray-200 mb-8 border border-gray-300">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">Patient Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">Payment Method</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider border border-gray-300 font-bold">Amount Paid</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction, index) => {
              const totalPaid = transaction.amount;
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{transaction.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{transaction.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right border border-gray-300">Rs. {totalPaid.toFixed(2)}</td>
                </tr>
              );
            })}

{/* Total Payments */}
<tr>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 border border-white"></td>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 border border-white"></td>
              <td className="px-6  p-0whitespace-nowrap text-sm text-gray-500 border border-white font-bold">Total cash Payments:</td>
              <td className="px-6   p-0 whitespace-nowrap text-sm text-gray-500 text-right border border-white font-bold">Rs. {totalcash.toFixed(2)}</td> {/* Include the total cash amount paid */}
            </tr>
            <tr>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 border border-white"></td>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 border border-white"></td>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 border border-white font-bold">Total card Payments:</td>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 text-right border border-white font-bold">Rs. {totalcard.toFixed(2)}</td> {/* Include the total card amount paid */}
            </tr>
            <tr>
              <td className="px-6 p-0 whitespace-nowrap text-sm text-gray-500 border border-white"></td>
              <td className="px-6 p-0 whitespace-nowrap text-sm text-gray-500 border border-white"></td>
              <td className="px-6  p-0 whitespace-nowrap text-sm text-gray-500 border border-white font-bold">Total All Payments:</td>
              <td className="px-6 p-0 whitespace-nowrap text-sm text-gray-500 text-right border border-white font-bold">Rs. {totalAll.toFixed(2)}</td> {/* Include the total amount paid */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthSummary;
