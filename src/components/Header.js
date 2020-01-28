import React from "react";
import Navbar from "./NavBar";
import Logo from "../assets/images/logo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="grid_container">
        <div className="grid_row">
          <div className="grid_desktop_3 logo">
            <NavLink exact to="/">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>
          <div className="grid_desktop_6">
            <Navbar />
          </div>
          <div className="grid_desktop_3 cart">
            <NavLink to="/cart">
              <ShoppingCartIcon fontSize="small" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
