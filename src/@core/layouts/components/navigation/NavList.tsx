import List, { ListProps } from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { NavigationItem } from "../../../../config/navigationConfig";
import NavItem from "./NavItem";

const StyledList = styled(List)<ListProps>(() => ({
  "& .fuse-list-item": {
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.04)",
    },
    "&:focus:not(.active)": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
  },
  "& .fuse-list-item-text": {
    margin: 0,
  },
  "& .fuse-list-item-text-primary": {
    lineHeight: "20px",
  },
}));

interface Props {
  navigation: NavigationItem[];
  handleItemClick: (item: NavigationItem) => void;
}
const NavList = ({ navigation, handleItemClick }: Props) => {
  return (
    <StyledList>
      {navigation.map((_item) => (
        <NavItem key={_item.id} item={_item} onItemClick={handleItemClick} />
      ))}
    </StyledList>
  );
};

export default NavList;
