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
      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    <ErrorMessage
      name={field}
      className="text-red-600"
      component="div"
    />
  </div>
}