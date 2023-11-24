import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  "& .content-center": {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },
}));

const BlankLayout = () => {
  return (
    <BlankLayoutWrapper>
      <Box
        className="app-content"
        sx={{ overflow: "hidden", minHeight: "100vh", position: "relative" }}
      >
        <Outlet />
      </Box>
    </BlankLayoutWrapper>
  );
};

export default BlankLayout;
