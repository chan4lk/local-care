import { Formik } from "formik";
import * as Yup from "yup";
import { SimpleInput } from "../components/SimpleInput";
import { SimpleSelect } from "../components/SimpleSelect";

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
    <div className="flex items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Add New Patient!</h1>
      </div>
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
              field="amount_paid"
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
              ${(parseFloat(values.total_amount || '0') - parseFloat(values.amount_paid || '0')).toFixed(2)}
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
