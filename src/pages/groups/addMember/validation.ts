import * as Yup from "yup";
export const addMemberValidation = Yup.object().shape({
  user: Yup.string().required("Member name is required"),
});
