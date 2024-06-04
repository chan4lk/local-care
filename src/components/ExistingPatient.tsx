import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import { useReactToPrint, ReactToPrintProps } from "react-to-print";
import { SimpleInput } from '../components/SimpleInput';
import { validationSchema } from './Schema';
import { Back } from './BackButton';
import { Search } from './Search';
import { IPatient, ITransactionStatus, PaymentMethod } from '../types/electron-api';
import BillFormat from './BillFormat'; 
interface FormValues {
  fullname: string;
  mobile: string;
  treatment: string;
  total_amount: string;
  paid_amount: string;
  payment_type: string; 
  previous_paid?: string; 
}

export const ExistingPatient = () => {
  const [patient, setPatient] = useState<IPatient | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    trigger: () => <button style={{ display: 'none' }}>Print Trigger</button>, // Hidden button to satisfy the type requirement
  });

  return (
    <div className="container mx-auto">
      <div className="flex items-center">
        <Back />
        <h1 className="text-3xl font-bold mt-8 mb-8 px-5 py-2">Existing Patient</h1>
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
            paid_amount: '',
            payment_type: "cash",
            previous_paid: patient.invoice.transactions
              .filter((t) => t.status === ITransactionStatus.Paid)
              .map((t) => t.amount)
              .reduce((sum, current) => sum + current, 0)
              .toString(),
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const pendingAmount =
              parseFloat(values.total_amount || '0') -
              parseFloat(values.previous_paid || '0') -
              parseFloat(values.paid_amount || '0');
            const patientDetails = {
              id: patient.id,
              fullname: values.fullname,
              mobile: values.mobile,
              treatment: values.treatment,
              invoice: {
                ...patient.invoice,
                total: parseFloat(values.total_amount || '0'),
                transactions: [
                  ...patient.invoice.transactions.filter((t) => t.status === ITransactionStatus.Paid),
                  {
                    status: ITransactionStatus.Pending,
                    amount: pendingAmount,
                    description: 'Pending Payment',
                    paymentMethod: PaymentMethod.None
                  },
                  {
                    id: patient.invoice.transactions.find((t) => t.status === ITransactionStatus.Pending)?.id,
                    status: ITransactionStatus.Paid,
                    amount: parseFloat(values.paid_amount || '0'),
                    description: 'Paid Amount',
                    paymentMethod: values.payment_type,
                  },
                ],
              },
            } as IPatient;
            const insert = await window.electronAPI.insertPatient(patientDetails);
            
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
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
                <div className="flex flex-col">
              <label
                htmlFor="payment_type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Payment Type
              </label>
              <select
                id="payment_type"
                name="payment_type"
                value={values.payment_type}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-36 py-2 pl-3 pr-8 border border-gray-900 focus:outline-none focus:ring-blue-100 focus:border-blue-100 text-sm rounded-md"
              >
                <option value="Cash">cash</option>
                <option value="Card">card</option>
              </select>
            </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <label htmlFor="amount_due" className="block text-sm font-medium text-gray-700 mr-4">
                      Previous Payments
                    </label>
                    <span id="amount_due" className="text-lg font-semibold text-gray-900">
                      {'Rs. '}
                      {parseFloat(values.previous_paid || '0').toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="amount_due" className="block text-sm font-medium text-gray-700 mr-4">
                      Amount Due
                    </label>
                    <span id="amount_due" className="text-lg font-semibold text-gray-900">
                      {'Rs. '}
                      {(
                        parseFloat(values.total_amount || '0') -
                        parseFloat(values.paid_amount || '0') -
                        parseFloat(values.previous_paid || '0')
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleSubmit()} // Manually trigger form submission
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-100 text-black font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-400"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="ml-4 px-4 py-2 bg-green-100 text-black font-bold rounded-md hover:bg-green-300 focus:outline-none focus:bg-green-400"
                  >
                    Print Bill
                  </button>
                </div>
              </form>
              <div className="hidden">
                <BillFormat ref={printRef} patient={patient} values={values} />
              </div>
            </>
          )}
        </Formik>
      )}
    </div>
  );
};
