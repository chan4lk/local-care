import React, { useEffect, useState, ChangeEvent } from "react";
import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

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
    setShowSearchBar(!showSearchBar); // Toggle the visibility of the search bar
    setShowForm(false); // Hide the form
  };

  const handleNewCustomerClick = () => {
    setShowForm(true); // Show the form when clicking "New Customer"
    setShowSearchBar(false); // Hide the search bar
  };

  const handleTreatmentCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cost = parseFloat(e.target.value);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      treatmentCost: isNaN(cost) ? 0 : parseFloat(cost.toFixed(2)), // Format to 2 decimal places
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
    setBalance(`$${calculatedBalance}`); // Add dollar sign
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

    // Create a new window to print the bill
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
    <div className="viewdb-container">
      <h1 className="text-2xl font-bold">Enter Customer Details</h1>
      <div className="button-container">
        <button className="button-left" onClick={handleNewCustomerClick}>
          New Customer
        </button>
        <button className="button-right" onClick={handleExistingCustomerClick}>
          {showSearchBar ? "Hide Search" : "Existing Customer"}
        </button>
      </div>
      {showSearchBar && (
        <div className="search-container">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Customer
          </label>
          <input
            type="text"
            id="search"
            className="input-field"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
      )}
      {showForm && (
        <form className="form-grid">
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={customer.name}
              onChange={handleNameChange}
              onFocus={() => clearDefaultValue("name")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              value={customer.mobile}
              onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="treatment">Treatment</label>
            <input
              type="text"
              id="treatment"
              value={customer.treatment}
              onChange={(e) => setCustomer({ ...customer, treatment: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="treatmentCost">Treatment Cost</label>
            <input
              type="number"
              id="treatmentCost"
              value={customer.treatmentCost === 0 ? "" : customer.treatmentCost}
              onChange={handleTreatmentCostChange}
              onFocus={() => clearDefaultValue("treatmentCost")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="paidAmount">Paid Amount</label>
            <input
              type="number"
              id="paidAmount"
              value={customer.paidAmount === 0 ? "" : customer.paidAmount}
              onChange={handlePaidAmountChange}
              onFocus={() => clearDefaultValue("paidAmount")}
            />
            <div className="balance-container">
            <span className="font-medium">Balance:</span>
            <span className="balance">{balance}</span>
          </div>
          </div>
          
          <div className="button-container">
            <button className="centered-button" onClick={handlePrintBill}>
              Print Bill
            </button>
            <div style={{ width: "10px" }}></div> {/* Adding some space */}
            <button className="centered-button" onClick={handleClearForm}>
              Reset
            </button>
          </div>
          
        </form>
      )}
    </div>
  );
};
