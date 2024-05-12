import { FormEvent, useState } from "react";

export const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [patients, setPatients] = useState([]);
  const handleInput = async (e: any) => {
    const text = e.target.value;
    setKeyword(text);
    const patients = await window.electronAPI.search({ keyword: text });
    setPatients(patients);
  };
  return (
    <div className="">
      <div className="inline-flex flex-col justify-center relative text-gray-500">
        <div className="relative">
          <input
            type="text"
            className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            placeholder="search..."
            value={keyword}
            onChange={handleInput}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="mt-2 text-sm">Results:</h3>
        <ul className="bg-white border border-gray-100 w-full mt-2 ">
          {patients.map((item, key) => (
            <li key={key} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
              <svg
                className="stroke-current absolute w-4 h-4 left-2 top-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {item.fullname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
