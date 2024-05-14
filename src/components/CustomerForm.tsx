import React, { ChangeEvent } from "react";

interface CustomerFormProps {
  customer: Customer;
  balance: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  handleTreatmentCostChange,
  handlePaidAmountChange,
  handlePrintBill,
  handleClearForm,
  clearDefaultValue,
}) => {
  return (
    <form className="form-grid">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            id="name"
            value={customer.name}
            onChange={handleNameChange}
            onFocus={() => clearDefaultValue("name")}
            className="input-field border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            value={customer.mobile}
            onChange={(e) => handlePaidAmountChange(e)}
            className="input-field border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1">
            Treatment
          </label>
          <input
            type="text"
            id="treatment"
            value={customer.treatment}
            onChange={(e) => handlePaidAmountChange(e)}
            className="input-field border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="treatmentCost" className="block text-sm font-medium text-gray-700 mb-1">
            Agreed Amount(LKR)
          </label>
          <input
            type="number"
            id="treatmentCost"
            value={customer.treatmentCost === 0 ? "" : customer.treatmentCost}
            onChange={handleTreatmentCostChange}
            onFocus={() => clearDefaultValue("treatmentCost")}
            className="input-field border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Paid Amount(LKR)
          </label>
          <input
            type="number"
            id="paidAmount"
            value={customer.paidAmount === 0 ? "" : customer.paidAmount}
            onChange={handlePaidAmountChange}
            onFocus={() => clearDefaultValue("paidAmount")}
            className="input-field border border-gray-300 rounded-md p-2 w-full"
          />
          <div className="flex items-center mt-2">
            <span className="font-medium">Balance:</span>
            <span className="ml-2">{balance}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-300 text-Black rounded-md hover:bg-blue-900"
          onClick={handleClearForm}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-blue-300 text-Black rounded-md hover:bg-blue-900"
          onClick={handlePrintBill}
        >
          Save & Print
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
