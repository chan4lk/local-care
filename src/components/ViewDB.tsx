import React, { useEffect, useState, ChangeEvent } from "react";
import CustomerForm from "./CustomerForm";
import SearchBar from "./SearchBar";
import { FaArrowLeft, FaUserPlus, FaUser } from "react-icons/fa"; // Import icons

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
  const [showButtons, setShowButtons] = useState<boolean>(true); // Manage visibility of buttons

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleExistingCustomerClick = () => {
    setShowSearchBar(true); // Show the search bar
    setShowForm(false);
    setShowButtons(false); // Hide both buttons when clicking "Existing Patient"
  };

  const handleNewCustomerClick = () => {
    setShowForm(true);
    setShowSearchBar(false);
    setShowButtons(false); // Hide both buttons after clicking "New Patient"
  };

  const handleBackClick = () => {
    setShowForm(false);
    setShowSearchBar(false);
    setShowButtons(true); // Show both buttons when clicking back
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
  }

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomer(prevState => ({
      ...prevState,
      mobile: newValue
    }));
  };
  
  const handleTreatmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomer(prevState => ({
      ...prevState,
      treatment: newValue
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

  const handleSearch = () => {
    // Your search logic here
    console.log("Search triggered with text:", searchText);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        {showButtons && (
          <div className="flex justify-between mb-4">
            <button className="px-4 py-2 bg-green-300 text-black rounded-md hover:bg-green-900" onClick={handleNewCustomerClick}>
              <FaUserPlus className="mr-2 items-center " /> New Patient {/* Use FaUserPlus icon */}
            </button>
            <button className="px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600" onClick={handleExistingCustomerClick}>
              <FaUser className="mr-2" /> Existing Patient {/* Use FaUser icon */}
            </button>
          </div>
        )}

        {showSearchBar && (
          <div>
            <button className="flex items-center bg-blue-200 text-black rounded-lg hover:bg-blue-400 mb-4" onClick={handleBackClick}>
              <FaArrowLeft className="mr-2" /> 
            </button>
            <SearchBar searchText={searchText} handleSearchTextChange={handleSearchTextChange} handleSearch={handleSearch} />
          </div>
        )}
        {showForm && (
          <div>
            <button className="flex items-center bg-blue-200 text-black rounded-lg hover:bg-blue-400 mb-4" onClick={handleBackClick}>
              <FaArrowLeft className="mr-2" /> 
            </button>
            <CustomerForm
              customer={customer}
              balance={balance}
              handleNameChange={handleNameChange}
              handleMobileChange={handleMobileChange}
              handleTreatmentChange={handleTreatmentChange}
              handleTreatmentCostChange={handleTreatmentCostChange}
              handlePaidAmountChange={handlePaidAmountChange}
              handlePrintBill={handlePrintBill}
              handleClearForm={handleClearForm}
              clearDefaultValue={clearDefaultValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDB;