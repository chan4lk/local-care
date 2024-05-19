import React, { useEffect, useState, ChangeEvent } from "react";
import CustomerForm from "./CustomerForm";
import SearchBar from "./SearchBar";
import { FaArrowLeft, FaUserPlus, FaUser } from "react-icons/fa";
import axios from 'axios';

interface Customer {
  id?: number;
  name: string;
  mobile: string;
  treatment: string;
  treatmentCost: number;
  paidAmount: number;
}

const FunctionsMain: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    mobile: "",
    treatment: "",
    treatmentCost: 0,
    paidAmount: 0,
  });
  const [balance, setBalance] = useState<string>("0.00 LKR");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);


const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
  const searchText = e.target.value;
  setSearchText(searchText); // Update the search text state
  handleSearch(); // Trigger the search function
};

  const handleExistingCustomerClick = () => {
    setShowSearchBar(true);
    setShowForm(false);
    setShowButtons(false);
  };

  const handleNewCustomerClick = () => {
    setShowForm(true);
    setShowSearchBar(false);
    setShowButtons(false);
    setEditMode(false);
    handleClearForm(); // Clear the form for new customer
  };

  const handleBackClick = () => {
    setShowForm(false);
    setShowSearchBar(false);
    setShowButtons(true);
  };

  const handleTreatmentCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cost = parseFloat(e.target.value);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      treatmentCost: isNaN(cost) ? 0 : cost,
    }));
  };

  const handlePaidAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      paidAmount: isNaN(amount) ? 0 : amount,
    }));
  };

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
    setBalance(`LKR ${calculatedBalance}`);
  }, [customer.treatmentCost, customer.paidAmount, customer.id]); // Add customer.id to the dependency array

  const handlePrintBill = () => {
    const formatAmount = (amount: number) => {
      return `LKR ${amount.toFixed(2)}`;
    };

    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

    const calculatedBalance = (customer.treatmentCost - customer.paidAmount).toFixed(2);

    const billContent = `
    <div>
      <div style="text-align: center;">
        <h1>Bill</h1>
        <p>Date & Time: ${currentDate}</p>
      </div>
      <div style="text-align: left; margin-left: auto; margin-right: auto; max-width: 400px;">
        <ul style="list-style-type: disc;">
          <li>Customer Name: ${customer.name}</li>
          <li>Mobile: ${customer.mobile}</li>
          <li>Treatment: ${customer.treatment}</li>
          <li>Treatment Cost: ${formatAmount(customer.treatmentCost)}</li>
          <li>Paid Amount: ${formatAmount(customer.paidAmount)}</li>
          <li>Balance: ${formatAmount(parseFloat(calculatedBalance))}</li>
        </ul>
      </div>
    </div>
    `;

    const billWindow = window.open("", "_blank");
    if (billWindow) {
      billWindow.document.write(billContent);
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

  const handleSearch = async () => {
    try {
      const response = await axios.get<Customer[]>(`http://localhost:3001/api/customers?search=${searchText}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  const handleSelectCustomer = (selectedCustomer: Customer) => {
    setCustomer(selectedCustomer);
    setEditMode(true);
    setShowForm(true);
    setShowSearchBar(false);
  };

  const handleSaveCustomer = async () => {
    try {
      if (editMode && customer.id) {
        await axios.put(`http://localhost:3001/api/customers/${customer.id}`, customer);
      } else {
        await axios.post('http://localhost:3001/api/customers', customer);
      }
      handleClearForm();
      handleBackClick();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        {/* Render New and Existing Patient buttons if showButtons is true */}
        {showButtons && (
          <div className="flex justify-between mb-4">
            {/* New Patient Button */}
            <button className="px-4 py-2 bg-green-300 text-black rounded-md hover:bg-green-900" onClick={handleNewCustomerClick}>
              <FaUserPlus className="mr-2 items-center" /> New Patient
            </button>
            {/* Existing Patient Button */}
            <button className="px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600" onClick={handleExistingCustomerClick}>
              <FaUser /> Existing Patient
            </button>
          </div>
        )}

        {/* Render SearchBar if showSearchBar is true */}
        {showSearchBar && (
  <div>
    {/* Back Button */}
    <button className="flex items-center bg-blue-200 text-black rounded-lg hover:bg-blue-400 mb-4" onClick={handleBackClick}>
      <FaArrowLeft className="mr-2" />
    </button>
    {/* SearchBar Component */}
    <SearchBar
      searchText={searchText}
      onChange={handleSearchTextChange}
      onSearch={handleSearch}
    />
    {/* Search results */}
    <div className="mt-4">
      {searchResults.map((result) => (
        <div key={result.id} onClick={() => handleSelectCustomer(result)} className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          {result.name}
        </div>
      ))}
    </div>
  </div>
)}


        {/* Render CustomerForm if showForm is true */}
        {showForm && (
          <div>
            {/* Back Button */}
            <button className="flex items-center bg-blue-200 text-black rounded-lg hover:bg-blue-400 mb-4" onClick={handleBackClick}>
              <FaArrowLeft className="mr-2" />
            </button>
            {/* CustomerForm Component */}
            <CustomerForm
              customer={customer}
              balance={balance}
              onNameChange={handleNameChange}
              onMobileChange={handleMobileChange}
              onTreatmentChange={handleTreatmentChange}
              onTreatmentCostChange={handleTreatmentCostChange}
              onPaidAmountChange={handlePaidAmountChange}
              onSave={handleSaveCustomer}
              handleClearForm={handleClearForm}
              clearDefaultValue={clearDefaultValue}
              handlePrintBill={handlePrintBill}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionsMain;
