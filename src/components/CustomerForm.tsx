import React, { ChangeEvent, useState } from 'react';

interface Customer {
  id?: number;
  name: string;
  mobile: string;
  treatment: string;
  treatmentCost: number;
  paidAmount: number;
}

interface CustomerFormProps {
  customer: Customer;
  balance: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMobileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTreatmentChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTreatmentCostChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaidAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  handleClearForm: () => void;
  clearDefaultValue: (field: keyof Customer) => void;
  handlePrintBill: () => void; // Add handlePrintBill function

}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  balance,
  onNameChange,
  onMobileChange,
  onTreatmentChange,
  onTreatmentCostChange,
  onPaidAmountChange,
  onSave,
  handleClearForm,
  clearDefaultValue,
  handlePrintBill, // Add handlePrintBill to props

}) => {
  const [formError, setFormError] = useState('');

  const validateForm = () => {
    if (!customer.name || !customer.treatmentCost || !customer.paidAmount) {
      setFormError('Please fill all the required fields.');
      return false;
    }
    setFormError('');
    return true;
  };
// Modify onSave function to include printing
const handleSaveAndPrint = () => {
  if (validateForm()) {
    onSave(); // Save the form data
    handlePrintBill(); // Print the bill
  }
};
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
              onChange={onNameChange}
              onFocus={() => clearDefaultValue('name')}
              placeholder="Name"
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="mobile"
              value={customer.mobile}
              onChange={onMobileChange}
              onFocus={() => clearDefaultValue('mobile')}
              placeholder="Mobile"
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
              required
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
              onChange={onTreatmentChange}
              placeholder="Treatment"
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
              value={customer.treatmentCost || ''}
              onChange={onTreatmentCostChange}
              onFocus={() => clearDefaultValue('treatmentCost')}
              placeholder="Treatment Cost"
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-700 mb-1 w-36">
              Paid Amount(LKR)
            </label>
            <input
              type="number"
              id="paidAmount"
              value={customer.paidAmount || ''}
              onChange={onPaidAmountChange}
              onFocus={() => clearDefaultValue('paidAmount')}
              placeholder="Paid Amount"
              className="input-field border border-gray-300 rounded-md p-2 flex-grow"
              required
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="font-medium">Balance:</span>
            <span className="ml-2">{balance}</span>
          </div>
        </div>

        {formError && <p className="text-red-500 mt-2"><strong>{formError}</strong></p>}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-300 text-black rounded-md hover:bg-blue-900"
            onClick={handleClearForm}
          >
            Reset
            </button>
            <button
            className="px-4 py-2 bg-blue-300 text-black rounded-md hover:bg-blue-900"
            onClick={handleSaveAndPrint} // Use the combined function
          >
            Save & Print
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;