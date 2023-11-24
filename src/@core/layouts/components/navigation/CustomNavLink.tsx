import { ForwardedRef, forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export interface CustomNavLinkProps extends NavLinkProps {
  activeclassname: string;
}
const CustomNavLink = forwardRef(
  (props: CustomNavLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
      <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? props.activeclassname : null]
            .filter(Boolean)
            .join(" ")
        }
      ></NavLink>
    );
  }
);

export default CustomNavLink;
