// Main component
import React, { useEffect, useState, ChangeEvent } from "react";
import CustomerForm from "./CustomerForm";
import SearchBar from "./SearchBar";

// Define interface Customer
interface Customer {
  name: string;
  mobile: string;
  treatment: string;
  treatmentCost: number;
  paidAmount: number;
}

export const ViewDB = () => {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    mobile: "",
    treatment: "",
    treatmentCost: 0,
    paidAmount: 0,
  });
  const [balance, setBalance] = useState<string>("0.00");
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleExistingCustomerClick = () => {
    setShowSearchBar(!showSearchBar);
    setShowForm(false);
  };

  const handleNewCustomerClick = () => {
    setShowForm(true);
    setShowSearchBar(false);
  };

  const handleTreatmentCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cost = parseFloat(e.target.value);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      treatmentCost: isNaN(cost) ? 0 : parseFloat(cost.toFixed(2)),
    }));
  };

  const handlePaidAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      paidAmount: isNaN(amount) ? 0 : amount,
    }));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      name: e.target.value,
    }));
  };

  const clearDefaultValue = (field: keyof Customer) => {
    if (customer[field] === 0 || customer[field] === "") {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [field]: "",
      }));
    }
  };

  useEffect(() => {
    const calculatedBalance = (customer.treatmentCost - customer.paidAmount).toFixed(2);
    setBalance(`$${calculatedBalance}`);
  }, [customer.treatmentCost, customer.paidAmount]);

  const handlePrintBill = () => {
    const billContent = `
      Customer Name: ${customer.name}
      Mobile: ${customer.mobile}
      Treatment: ${customer.treatment}
      Treatment Cost: $${customer.treatmentCost}
      Paid Amount: $${customer.paidAmount}
      Balance: $${balance}
    `;

    const billWindow = window.open("", "_blank");
    if (billWindow) {
      billWindow.document.write(`<pre>${billContent}</pre>`);
      billWindow.document.close();
      billWindow.print();
    } else {
      alert("Please allow pop-ups for this site to print the bill.");
    }
  };

  const handleClearForm = () => {
    setCustomer({
      name: "",
      mobile: "",
      treatment: "",
      treatmentCost: 0,
      paidAmount: 0,
    });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
              <div className="flex justify-between mb-4">
          <button className="px-4 py-2 bg-green-300 text-Black rounded-md hover:bg-green-900" onClick={handleNewCustomerClick}>
            New Patient
          </button>
          <button className="px-4 py-2 bg-blue-500 text-Black rounded-md hover:bg-blue-600" onClick={handleExistingCustomerClick}>
            {showSearchBar ? "Existing Patient" : "Existing Patient"}
          </button>
        </div>

        {showSearchBar && <SearchBar searchText={searchText} handleSearchTextChange={handleSearchTextChange} />}
        {showForm && (
          <CustomerForm
            customer={customer}
            balance={balance}
            handleNameChange={handleNameChange}
            handleTreatmentCostChange={handleTreatmentCostChange}
            handlePaidAmountChange={handlePaidAmountChange}
            handlePrintBill={handlePrintBill}
            handleClearForm={handleClearForm}
            clearDefaultValue={clearDefaultValue}
          />
        )}
      </div>
    </div>
  );
};

export default ViewDB;
