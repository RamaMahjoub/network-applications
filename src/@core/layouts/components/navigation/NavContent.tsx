import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import NavList from "./NavList";
import navigationConfig from "../../../../config/navigationConfig";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  overflow: "hidden",
  height: "100%",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px rgba(0, 0, 0, 0.24)`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px rgba(0, 0, 0, 0.37)`,
  },
}));

const StyledContent = styled(Box)(() => ({
  display: "flex",
  flex: "1 1 0%",
  minHeight: "0px",
  overflowX: "hidden",
  flexDirection: "column",
}));

const NavContent = () => {
  return (
    <Root>
      <StyledContent>
        <NavList navigation={navigationConfig} handleItemClick={() => {}} />
      </StyledContent>
    </Root>
  );
};

export default NavContent;
