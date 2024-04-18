import React from "react";
import { NavLink as ReactRouterNavLink, NavLinkProps } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

interface CustomNavLinkProps extends NavLinkProps {
  location: string;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  children,
  location,
  ...rest
}) => {
  const isActive =
    to === "/" ? location === "/" : location.startsWith(to as string);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isActive) e.preventDefault();
  };

  return (
    <ReactRouterNavLink
      to={to}
      className={`nav-link ${isActive ? "green" : ""}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </ReactRouterNavLink>
  );
};

export default CustomNavLink;
