/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";

const useFormSubmit = (
  initialValues: any,
  submitHandler: (values: any) => any,
  validationSchema?: any
) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });

  return formik;
};

export default useFormSubmit;
