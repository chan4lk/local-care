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
      className="mt-1 block w-full py-2 px-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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