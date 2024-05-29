import React, { useRef, useState } from "react";
import { Formik } from "formik";
import { useReactToPrint } from "react-to-print";
import { SimpleInput } from "../components/SimpleInput";
import { validationSchema } from "./Schema";
import { Back } from "./BackButton";
import { Search } from "./Search";
import { IPatient, ITransactionStatus } from "../types/electron-api";

interface BillFormatProps {
  patient: IPatient;
  values: {
    fullname: string;
    mobile: string;
    treatment: string;
    total_amount: string;
    paid_amount: string;
    previous_paid: string;
  };
}

const BillFormat = React.forwardRef<HTMLDivElement, BillFormatProps>(
  ({ patient, values }, ref) => (
    <div ref={ref} style={{ width: "12cm", height: "10.1cm", padding: "1cm" }}>
      <h1>Patient Bill</h1>
      <p><strong>Full Name:</strong> {patient.fullname}</p>
      <p><strong>Mobile:</strong> {patient.mobile}</p>
      <p><strong>Treatment:</strong> {patient.treatment}</p>
      <p><strong>Total Amount:</strong> {values.total_amount}</p>
      <p><strong>Paid Amount:</strong> {values.paid_amount}</p>
      <p><strong>Previous Payments:</strong> {values.previous_paid}</p>
      <p><strong>Amount Due:</strong> {(
        parseFloat(values.total_amount || "0") -
        parseFloat(values.paid_amount || "0") -
        parseFloat(values.previous_paid || "0")
      ).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
    </div>
  )
);

BillFormat.displayName = "BillFormat";

export const ExistingPatient = () => {
  const [patient, setPatient] = useState<IPatient | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
              .reduce((sum, current) => sum + current, 0)
              .toString(),
            paid_amount: "",
            previous_paid: patient.invoice.transactions
              .filter((t) => t.status == ITransactionStatus.Paid)
              .map((t) => t.amount)
              .reduce((sum, current) => sum + current, 0)
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
              treatment: values.treatment,
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
            handlePrint();
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
            <>
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
                  label="Treatment"
                  field="treatment"
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
                      {"Rs. "}
                      {parseFloat(values.previous_paid || "0").toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
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
                      {"Rs. "}
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
                    Submit & Print
                  </button>
                </div>
              </form>
              <div style={{ display: "none" }}>
                <BillFormat ref={printRef} patient={patient} values={values} />
              </div>
            </>
          )}
        </Formik>
      )}
    </div>
  );
};
