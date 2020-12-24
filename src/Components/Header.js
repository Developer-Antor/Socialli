import React from "react";
import Logo from "../Assets/mylogo.png";
import "./Header.css";
const Header = () => {
  return (
    <div className="app-header">
      <img src={Logo} alt="" className="logo" />
    </div>
  );
};

export default Header;
