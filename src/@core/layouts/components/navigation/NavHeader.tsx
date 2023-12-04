import { Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getInitials } from "../../../utils/getinitials";
import { getUserData } from "../../../utils/user-storage";

const HeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  minHeight: theme.mixins.toolbar.minHeight,
  paddingLeft: theme.spacing(3),
}));
const NavHeader = () => {
  const theme = useTheme();
  const user = getUserData();
  return (
    <HeaderWrapper>
      <Avatar sx={{ width: 36, height: 36 }}>
        <Typography className="text-xs">
          {getInitials(user?.name || "")}
        </Typography>
      </Avatar>
      <Typography variant="subtitle1" sx={{ paddingLeft: theme.spacing(1) }}>
        {user?.name}
      </Typography>
    </HeaderWrapper>
  );
};

export default NavHeader;
