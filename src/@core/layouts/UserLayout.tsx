import { styled } from "@mui/material/styles";
import NavContent from "./components/navigation/NavContent";
import Box, { BoxProps } from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Drawer from "./components/navigation/Drawer";
import NavHeader from "./components/navigation/NavHeader";
import themeConfig from "../../config/themeConfig";
import LayoutAppBar from "./components/appbar/AppBar";

const LayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});
const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(3),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const UserLayout = () => {
  const { navigationSize } = themeConfig;
  return (
    <LayoutWrapper>
      <Drawer navWidth={navigationSize}>
        <NavHeader />
        <NavContent />
      </Drawer>
      <MainContentWrapper>
        <LayoutAppBar />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContentWrapper>
    </LayoutWrapper>
  );
};

export default UserLayout;
