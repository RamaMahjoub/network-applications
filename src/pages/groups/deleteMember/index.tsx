import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  deleteMember,
  getGroupMembers,
  selectDeleteMemberStatus,
} from "../../../store/groupMemberSlice";
import { ResponseStatus } from "../../../store/types";
import Clip from "../../../@core/components/clip-spinner";

interface Props {
  groupId: number;
  memberId: number;
  open: boolean;
  handleDialog: () => void;
}
const DeleteMember = ({ open, handleDialog, memberId, groupId }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDeleteMemberStatus);

  const handleDelete = () => {
    dispatch(deleteMember({ groupId, memberId })).then(() => {
      handleDialog();
      dispatch(getGroupMembers({ id: groupId }));
    });
  };
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
        Delete Member
      </DialogTitle>
      <DialogContent
        sx={{
          px: (theme) => [
            `${theme.spacing(3)} !important`,
            `${theme.spacing(12)} !important`,
          ],
        }}
      >
        <Box
          sx={{
            gap: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Are you sure you need to delete this member?</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: (theme) =>
                  hexToRGBA(theme.palette.error.main, 0.8),
              }}
              onClick={handleDelete}
            >
              {status === ResponseStatus.LOADING ? <Clip /> : "Delete Member"}
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: (theme) => theme.palette.action.disabled,
              }}
              onClick={handleDialog}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMember;
