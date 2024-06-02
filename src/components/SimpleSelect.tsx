import { ErrorMessage } from "formik"
import React from "react";

interface SimpleSelectProps {
    handleBlur: any;
    handleChange: any;
    values: any;
    field: string;
    label: string;
    options: {value: string, label: string}[];
}

export const SimpleSelect: React.FC<SimpleSelectProps> = 
    ({handleBlur, handleChange, values, field, label, options}) => {
    return <div>
    <label
      htmlFor={field}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={field}
      name={field}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[field]}
      className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
      >
        {options.map(option => <option key={option.label} value={option.value}>{option.label}</option>)}
    </select>
    <ErrorMessage
      name={field}
      className="text-red-600"
      component="div"
    />
  </div>
}