// src/components/CustomerList.tsx
import React from 'react';

interface Customer {
  id?: number;
  name: string;
  mobile: string;
  treatment: string;
  treatmentCost: number;
  paidAmount: number;
}

interface CustomerListProps {
  customers: Customer[];
  handleCustomerSelect: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, handleCustomerSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <ul className="list-disc pl-6">
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="cursor-pointer hover:underline"
            onClick={() => handleCustomerSelect(customer)}
          >
            {customer.name} - {customer.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
