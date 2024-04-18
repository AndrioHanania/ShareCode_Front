import React from "react";
import imagePath from "../assets/logo.png";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={imagePath} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
