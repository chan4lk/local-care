import { ErrorMessage } from "formik"
import React from "react";

interface SimpleInputProps {
  handleBlur: { (e: React.FocusEvent<any>): void; <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void; };
  handleChange: { (e: React.ChangeEvent<any>): void; <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void; };
  values: any;
  label: string;
  field: string;
  disabled?: boolean; // Add disabled prop
}

export const SimpleInput: React.FC<SimpleInputProps> = ({label, handleBlur, handleChange, values, field, disabled}) => {
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
      disabled={disabled}
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