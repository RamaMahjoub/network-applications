import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiToolBar, { ToolbarProps } from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "../../../components/icon";
import { IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import Logout from "../../../../pages/auth/Logout";

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const ToolBar = styled(MuiToolBar)<ToolbarProps>(({ theme }) => ({
  minHeight: `${theme.mixins.toolbar.minHeight as number}px !important`,
  width: "100%",
  marginTop: theme.spacing(0.25),
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(0, 0.35)} !important`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LayoutAppBar = () => {
  const theme = useTheme();
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const handleLogout = useCallback(() => setOpenLogout((pre) => !pre), []);
  return (
    <>
      <AppBar elevation={1} position="sticky">
        <ToolBar>
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ mr: 2, display: "flex", alignItems: "center" }}
          >
            Network applications
          </Typography>
          <IconButton onClick={handleLogout}>
            <Icon icon="heroicons-outline:logout" />
          </IconButton>
        </ToolBar>
      </AppBar>
      <Logout open={openLogout} handleDialog={handleLogout} />
    </>
  );
};

export default LayoutAppBar;
