import React from "react";

export const PrintButton = ({
  handlePrintSummary,
}: {
  handlePrintSummary: () => void;
}) => {
  return (
    <button
      onClick={handlePrintSummary}
      className="flex items-center p-4 bg-blue-100 rounded-lg shadow-md m-4 cursor-pointer hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 font-bold"
    >
      <svg
        className="w-6 h-6 fill-current mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M18 20h4v-4h2v4c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2v-4h2v4h4v-8H4l8-8 8 8h-6z" />
      </svg>
      <span>Print Summary</span>
    </button>
  );
};
