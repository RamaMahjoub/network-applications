/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IAddMemberRequest } from "./schema";
import useForm from "../../../hooks/useForm";
import { addMemberValidation } from "./validation";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  addMember,
  getGroupMembers,
  selectAddMemberStatus,
} from "../../../store/groupMemberSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ResponseStatus } from "../../../store/types";
import Clip from "../../../@core/components/clip-spinner";

interface Props {
  groupId: number;
  open: boolean;
  handleDialog: () => void;
}
const AddMember = ({ open, handleDialog, groupId }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAddMemberStatus);
  const initialValues: IAddMemberRequest = {
    group_id: groupId,
    user: "",
  };
  const formik = useForm(
    initialValues,
    (values: IAddMemberRequest) => {
      dispatch(addMember(values))
        .then(() => {
          handleDialog();
          dispatch(getGroupMembers({ id: groupId }));
        })
        .finally(() => formik.resetForm());
    },
    addMemberValidation
  );

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleDialog}>
      <DialogTitle
        sx={{
          textAlign: "center",
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(12)} !important`,
          ],
        }}
      >
        Add New Member
      </DialogTitle>
      <DialogContent
        sx={{
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(12)} !important`,
          ],
        }}
      >
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              label="Member Name"
              margin="dense"
              {...formik.getFieldProps("user")}
              helperText={
                formik.touched.user && Boolean(formik.errors.user)
                  ? String(formik.errors.user)
                  : ""
              }
              error={formik.touched.user && Boolean(formik.errors.user)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none" }}
              disabled={!formik.dirty || !formik.isValid}
            >
              {status === ResponseStatus.LOADING ? <Clip /> : "Add Member"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
