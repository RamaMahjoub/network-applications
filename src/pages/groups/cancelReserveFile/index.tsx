import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getUnBookedFiles,
  getGroupFiles,
  selectUnBookFileData,
  selectUnBookFileError,
  selectUnBookFileStatus,
  unBookFile,
} from "../../../store/groupFileSlice";
import { useEffect } from "react";
import { ResponseStatus } from "../../../store/types";
import { toast } from "react-toastify";
import { IUnBookFileRequest } from "./schema";
import Clip from "../../../@core/components/clip-spinner";

interface Props {
  fileId: number;
  groupId: number;
  open: boolean;
  handleDialog: () => void;
}
const CancelReserveFile = ({ fileId, groupId, open, handleDialog }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectUnBookFileStatus);
  const error = useAppSelector(selectUnBookFileError);
  const data = useAppSelector(selectUnBookFileData);

  useEffect(() => {
    if (status === ResponseStatus.SUCCEEDED) {
      handleDialog();
      toast.success(data?.message);
    } else if (status === ResponseStatus.FAILED) {
      toast.error(error);
    }
  }, [status, error, data, handleDialog]);

  const handleUnBook = () => {
    console.log("group", groupId);
    const req: IUnBookFileRequest = {
      group_id: groupId,
      file_id: fileId,
    };
    dispatch(unBookFile(req)).then(() => {
      dispatch(getGroupFiles({ id: groupId }));
      dispatch(getUnBookedFiles({ id: groupId }));
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
        Cancel File Reservation
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
          <Typography>
            Are you sure you need to cancel this file reservation?
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: (theme) =>
                  hexToRGBA(theme.palette.error.main, 0.8),
              }}
              onClick={handleUnBook}
            >
              {status === ResponseStatus.LOADING ? (
                <Clip />
              ) : (
                "Cancel Reservation"
              )}
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

export default CancelReserveFile;
