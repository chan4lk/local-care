import React from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Required"),
  treatment_type: Yup.string().required("Required"),
  total_amount: Yup.number().positive().required("Required"),
  amount_paid: Yup.number()
    .min(0, "Amount must be positive")
    .max(Yup.ref("total_amount"), "Amount must not exceed the total amount")
    .required("Required"),
});

const NewPatient = () => (
  <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-8">Add New Patient!</h1>
    <Formik
      initialValues={{
        fullname: "",
        mobile: "",
        treatment_type: "",
        total_amount: "",
        amount_paid: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              name="fullname"
              id="fullname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="fullname"
              className="text-red-600"
              component="div"
            />
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              name="mobile"
              id="mobile"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mobile}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name="mobile"
              className="text-red-600"
              component="div"
            />
          </div>
          <div>
            <label
              htmlFor="treatment_type"
              className="block text-sm font-medium text-gray-700"
            >
              Treatment Type
            </label>
            <select
              id="treatment_type"
              name="treatment_type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.treatment_type}
              className="mt-1 block w-full py-2 px-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select</option>
              <option value="dental">Dental</option>
              <option value="dermatology">Dermatology</option>
              <option value="general_medicine">General Medicine</option>
              {/* Add more treatment types as needed */}
            </select>
            <ErrorMessage
              name="treatment_type"
              className="text-red-600"
              component="div"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label
                htmlFor="total_amount"
                className="block text-sm font-medium text-gray-700"
              >
                Total Amount
              </label>
              <input
                type="number"
                id="total_amount"
                name="total_amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.total_amount}
                className="mt-1 block w-full py-2 px-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="total_amount"
                className="text-red-600"
                component="div"
              />
            </div>
            <div>
              <label
                htmlFor="amount_paid"
                className="block text-sm font-medium text-gray-700"
              >
                Amount Paid
              </label>
              <input
                type="number"
                id="amount_paid"
                name="amount_paid"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount_paid}
                className="mt-1 block w-full py-2 px-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="amount_paid"
                className="text-red-600"
                component="div"
              />
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="amount_due"
              className="block text-sm font-medium text-gray-700 mr-4"
            >
              Amount Due
            </label>
            <span
              id="amount_due"
              className="text-lg font-semibold text-gray-900"
            >
              ${0}
            </span>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default NewPatient;
