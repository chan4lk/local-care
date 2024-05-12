import { Formik } from "formik";
import { SimpleInput } from "../components/SimpleInput";
import { SimpleSelect } from "../components/SimpleSelect";
import { validationSchema } from "./Schema";
import { Back } from "./BackButton";

export const NewPatient = () => {
  return <div className="container mx-auto">
   <div className="flex items-center ">
      <Back />
      <h1 className="text-3xl font-bold mt-8 mb-8 px-5 py-2">New Patient</h1>
    </div>
    <Formik
      initialValues={{
        fullname: "",
        mobile: "",
        treatment_type: "",
        total_amount: "",
        paid_amount: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const insert = await window.electronAPI.insertPatient({
          ...values,
          total_amount: parseFloat(values.total_amount),
          paid_amount: parseFloat(values.paid_amount)
        });

        console.log('Insert: ');
        console.table(insert);
        console.log('Fetch: ');
        console.table(await window.electronAPI.fetchAll());
        resetForm();
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
              ${(parseFloat(values.total_amount || '0') - parseFloat(values.paid_amount || '0')).toFixed(2)}
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
};
