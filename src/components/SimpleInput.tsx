import { ErrorMessage } from "formik"
import React from "react";

interface SimpleInputProps {
    handleBlur: any;
    handleChange: any;
    values: any;
    field: string;
    label: string;
}

export const SimpleInput: React.FC<SimpleInputProps> = ({label, handleBlur, handleChange, values, field}) => {
    return <div>
    <label
      htmlFor={field}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      name={field}
      id={field}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[field]}
      className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
      />
    <ErrorMessage
      name={field}
      className="text-red-600"
      component="div"
    />
  </div>
}