import { Formik } from "formik";
import { SimpleInput } from "../components/SimpleInput";
import { SimpleSelect } from "../components/SimpleSelect";
import { validationSchema } from "./Schema";
import { Back } from "./BackButton";
import { Search } from "./Search";
import { useState } from "react";
import Patient from "../database/models/Patient";

export const ExistingPatient = () => {
  const [patient, setPatient] = useState<Patient>(null);

  return (
    <div className="container mx-auto">
      <div className="flex items-center ">
        <Back />
        <h1 className="text-3xl font-bold mt-8 mb-8 px-5 py-2">
          Existing Patient
        </h1>
      </div>
      {patient == null ? (
        <Search setPatient={setPatient} />
      ) : (
        <Formik
          initialValues={{
            ...patient,
            total_amount: patient.total_amount?.toString(),
            paid_amount: "",
            previous_paid: patient.paid_amount?.toString(),
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const insert = await window.electronAPI.insertPatient({
              ...values,
              id: patient.id,
              total_amount: parseFloat(values.total_amount),
              paid_amount: patient.paid_amount + parseFloat(values.paid_amount)
            });
            alert('Payment completed')
            resetForm();
            setPatient(null);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <SimpleInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                label="Full Name"
                field="fullname"
              />
              <SimpleInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                label="Mobile"
                field="mobile"
              />
              <SimpleSelect
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                label="Treatment Type"
                field="treatment_type"
                options={[
                  { value: "", label: "Select" },
                  { value: "dental", label: "Dental" },
                  { value: "dermatology", label: "Dermatology" },
                  { value: "general_medicine", label: "General Medicine" },
                ]}
              />

              <div className="flex items-center justify-between">
                <SimpleInput
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  label="Total Amount"
                  field="total_amount"
                />
                <SimpleInput
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  label="Amount Paid"
                  field="paid_amount"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    htmlFor="amount_due"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Previous Payments
                  </label>
                  <span
                    id="amount_due"
                    className="text-lg font-semibold text-gray-900"
                  >
                    ${parseFloat(values.previous_paid || "0").toFixed(2)}
                  </span>
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
                    $
                    {(
                      parseFloat(values.total_amount || "0") -
                      parseFloat(values.paid_amount || "0") -
                      parseFloat(values.previous_paid || "0")
                    ).toFixed(2)}
                  </span>
                </div>
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
      )}
    </div>
  );
};
