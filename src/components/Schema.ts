import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Required"),
  treatment_type: Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Required"),
  total_amount: Yup.number().positive().required("Required"),
  paid_amount: Yup.number()
    .min(0, "Amount must be positive")
    .max(Yup.ref("total_amount"), "Amount must not exceed the total amount")
    .required("Required"),
});
