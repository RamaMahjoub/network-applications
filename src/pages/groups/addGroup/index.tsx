import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IAddGroupRequest } from "./schema";
import useForm from "../../../hooks/useForm";
import { addGroupValidation } from "./validation";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  addGroup,
  getUserGroups,
  selectAddGroupData,
  selectAddGroupError,
  selectAddGroupStatus,
} from "../../../store/groupSlice";
import Clip from "../../../@core/components/clip-spinner";
import { ResponseStatus } from "../../../store/types";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const AddGroup = ({ open, handleOpen }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAddGroupStatus);
  const error = useAppSelector(selectAddGroupError);
  const data = useAppSelector(selectAddGroupData);

  const initialValues: IAddGroupRequest = {
    name: "",
  };
  const formik = useForm(
    initialValues,
    (values: IAddGroupRequest) => {
      dispatch(addGroup(values)).then(() => dispatch(getUserGroups()));
    },
    addGroupValidation
  );

  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      handleOpen();
      toast.success(data?.message);
    } else if (status === ResponseStatus.FAILED) {
      toast.error(error);
    }
  }, [status, error, data, handleOpen]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleOpen}>
      <DialogTitle
        sx={{
          textAlign: "center",
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(12)} !important`,
          ],
        }}
      >
        Create New Group
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
              label="Group Name"
              margin="dense"
              {...formik.getFieldProps("name")}
              helperText={
                formik.touched.name && Boolean(formik.errors.name)
                  ? String(formik.errors.name)
                  : ""
              }
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none" }}
              disabled={!formik.dirty || !formik.isValid}
            >
              {status === ResponseStatus.LOADING ? <Clip /> : "Create Group"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroup;
