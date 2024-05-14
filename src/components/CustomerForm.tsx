import React, { ChangeEvent } from "react";

interface Customer {
  name: string;
  mobile: string;
  treatment: string;
  treatmentCost: number;
  paidAmount: number;
}

interface CustomerFormProps {
  customer: Customer;
  balance: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMobileChange: (e: ChangeEvent<HTMLInputElement>) => void; // Define handleMobileChange
  handleTreatmentChange: (e: ChangeEvent<HTMLInputElement>) => void; // Define handleTreatmentChange
  handleTreatmentCostChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePaidAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePrintBill: () => void;
  handleClearForm: () => void;
  clearDefaultValue: (field: keyof Customer) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  balance,
  handleNameChange,
  handleMobileChange,
  handleTreatmentChange,
  handleTreatmentCostChange,
  handlePaidAmountChange,
  handlePrintBill,
  handleClearForm,
  clearDefaultValue,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">New Patient</h1>
      <form className="form-grid">
        <div className="grid-cols-2 gap-4">
          <div className="mb-2 flex items-center">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={customer.name}
              onChange={handleNameChange}
              onFocus={() => clearDefaultValue("name")}
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
              required
            />
          </div>

          <div className="mb-2 flex items-center">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobile"
              value={customer.mobile}
              onChange={handleMobileChange} // Use handleMobileChange here
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
            />
          </div>
          <div className="mb-2 flex items-center">
            <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Treatment
            </label>
            <input
              type="text"
              id="treatment"
              value={customer.treatment}
              onChange={handleTreatmentChange} // Use handleTreatmentChange here
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
            />
          </div>

          <div className="mb-2 flex items-center">
            <label htmlFor="treatmentCost" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Agreed Amount(LKR)
            </label>
            <input
              type="number"
              id="treatmentCost"
              value={customer.treatmentCost === 0 ? "" : customer.treatmentCost}
              onChange={handleTreatmentCostChange}
              onFocus={() => clearDefaultValue("treatmentCost")}
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
            />
          </div>
          
          <div className="mb-2 flex items-center">
            <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Paid Amount(LKR)
            </label>
            <input
              type="number"
              id="paidAmount"
              value={customer.paidAmount === 0 ? "" : customer.paidAmount}
              onChange={handlePaidAmountChange}
              onFocus={() => clearDefaultValue("paidAmount")}
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="font-medium">Balance:</span>
            <span className="ml-2">{balance}</span>
          </div>

        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-300 text-black rounded-md hover:bg-blue-900"
            onClick={handleClearForm}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 bg-blue-300 text-black rounded-md hover:bg-blue-900"
            onClick={handlePrintBill}
          >
            Save & Print
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
