import { styled } from "@mui/material/styles";
import { NavigationItem } from "../../../../config/navigationConfig";
import {
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CustomNavLink, { CustomNavLinkProps } from "./CustomNavLink";
import Icon from "../../../components/icon";
import clsx from "clsx";
const Root = styled(ListItemButton)<CustomNavLinkProps & ListItemButtonProps>(
  ({ theme }) => ({
    minHeight: 44,
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none!important",
    margin: `0 ${theme.spacing(2)} 4px ${theme.spacing(2)}`,
    padding: "10px 16px",
    display: "flex",
    gap: 2,
    "&.active": {
      color: theme.palette.text.primary,
      backgroundColor: "rgba(0, 0, 0, .05)!important",
      pointerEvents: "none",
      transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
      "& > .fuse-list-item-text-primary": {
        color: "inherit",
      },
      "& > .fuse-list-item-icon": {
        color: "inherit",
      },
    },
    "& .fuse-list-item-icon": {
      marginRight: theme.spacing(1),
      minWidth: "24px",
      color: "inherit",
    },
  })
);

interface NavItemProps {
  item: NavigationItem;
  onItemClick?: (item: NavigationItem) => void;
}
const NavItem = ({ item, onItemClick }: NavItemProps) => {
  return (
    <ListItem disablePadding sx={{ mt: 0.25 }}>
      <Root
        component={CustomNavLink}
        to={item.url || ""}
        onClick={() => onItemClick && onItemClick(item)}
        activeclassname={"active"}
        className={clsx("fuse-list-item")}
        role="button"
      >
        {item.icon && (
          <ListItemIcon className="fuse-list-item-icon shrink-0">
            <Icon icon={item.icon} />
          </ListItemIcon>
        )}

        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          classes={{
            primary: "text-13 font-medium fuse-list-item-text-primary truncate",
          }}
        />
      </Root>
    </ListItem>
  );
};

export default NavItem;
