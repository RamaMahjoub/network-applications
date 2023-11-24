import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ReactNode } from "react";

interface Props {
  navWidth: number;
  children: ReactNode;
}
const Drawer = ({ navWidth, children }: Props) => {
  return (
    <MuiSwipeableDrawer
      open={true}
      onOpen={() => null}
      onClose={() => null}
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          width: navWidth,
        },
      }}
      sx={{ width: navWidth }}
    >
      {children}
    </MuiSwipeableDrawer>
  );
};

export default Drawer;
