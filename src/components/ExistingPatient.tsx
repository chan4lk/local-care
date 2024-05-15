import { Formik } from "formik";
import { SimpleInput } from "../components/SimpleInput";
import { SimpleSelect } from "../components/SimpleSelect";
import { validationSchema } from "./Schema";
import { Back } from "./BackButton";
import { Search } from "./Search";
import { useState } from "react";
import { IPatient, ITransactionStatus } from "../types/electron-api";

export const ExistingPatient = () => {
  const [patient, setPatient] = useState<IPatient>(null);

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
            total_amount: patient.invoice.transactions
              .map((t) => t.amount)
              .reduce((sum, curent) => sum + curent, 0)
              .toString(),
            paid_amount: "",
            previous_paid: patient.invoice.transactions
              .filter((t) => t.status == ITransactionStatus.Paid)
              .map((t) => t.amount)
              .reduce((sum, curent) => sum + curent, 0)
              .toString(),
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const pendingAmount =
              parseFloat(values.total_amount || "0") -
              parseFloat(values.previous_paid || "0") -
              parseFloat(values.paid_amount || "0");
            const patientDetails = {
              id: patient.id,
              fullname: values.fullname,
              mobile: values.mobile,
              treatment_type: values.treatment_type,
              invoice: {
                ...patient.invoice,
                total: parseFloat(values.total_amount || "0"),
                transactions: [
                  ...patient.invoice.transactions.filter(t => t.status === ITransactionStatus.Paid),
                  {
                    status: ITransactionStatus.Pending,
                    amount: pendingAmount,
                    description: "Pending Payment",
                  },
                  {
                    id: patient.invoice.transactions.find(t => t.status === ITransactionStatus.Pending)?.id,
                    status: ITransactionStatus.Paid,
                    amount: parseFloat(values.paid_amount || "0"),
                    description: "Paid Amount",
                  },
                ],
              },
            } as IPatient;
            const insert = await window.electronAPI.insertPatient(patientDetails);
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
              <SimpleInput
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              label="Treatment Type"
              field="treatment_type"
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
                    ${parseFloat(values.previous_paid || "0").toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
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
                    ).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
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
