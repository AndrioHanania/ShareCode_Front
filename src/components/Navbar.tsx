// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file
import CustomNavLink from "./CustomNavLink";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState<string>("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <CustomNavLink to="/" location={location.pathname}>
            Home
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/lobby" location={location.pathname}>
            Lobby
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/code-block/" location={location.pathname}>
            Code Block
          </CustomNavLink>
        </li>

        {/* Add more links for other pages as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
