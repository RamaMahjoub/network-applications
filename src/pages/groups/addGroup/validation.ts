import * as Yup from "yup";
export const addGroupValidation = Yup.object().shape({
  name: Yup.string().required("Group name is required"),
});
