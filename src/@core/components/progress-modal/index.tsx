/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Dispatch, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  progressVal: number;
  handleOpen: Dispatch<React.SetStateAction<boolean>>;
}

const ProgressModal = ({ open, progressVal, handleOpen }: Props) => {
  useEffect(() => {
    if (progressVal === 100) {
      handleOpen(false);
      toast.success("file uploaded successfully");
    }
  }, [progressVal]);

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <CircularProgress variant="determinate" value={progressVal} />
        <Typography>Uploading... {progressVal}%</Typography>
      </Box>
    </Modal>
  );
};

export default ProgressModal;
