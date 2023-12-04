import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
import { toast } from "react-toastify";

import {
  clearUserToken,
  clearUserData,
} from "../../../@core/utils/user-storage";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../router/constants";

interface Props {
  open: boolean;
  handleDialog: () => void;
}
const Logout = ({ open, handleDialog }: Props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUserToken();
    clearUserData();
    navigate(`/${routes.LOGIN}`);
    toast.success("Logged out successfully");
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
        Logout
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
          <Typography>Are you sure you need to logout?</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: (theme) =>
                  hexToRGBA(theme.palette.error.main, 0.8),
              }}
              onClick={handleLogout}
            >
              Logout
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

export default Logout;
