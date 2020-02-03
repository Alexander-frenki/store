import React, { useState } from "react";
import Navbar from "./NavBar";
import Logo from "../assets/images/logo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink } from "react-router-dom";

function Header() {
  let [isNavbarShow, setIsNavBarShow] = useState(false);

  return (
    <header>
      <div className="grid_container">
        <div className="grid_row">
          <div className="grid_desktop_3 logo">
            <NavLink exact to="/">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>
          <div className={`burger grid_tablet_6 ${isNavbarShow ? 'active': ''}`} onClick={()=>setIsNavBarShow(!isNavbarShow)}><span></span><span></span><span></span></div>
            <Navbar isShow={isNavbarShow} setIsNavBarShow={setIsNavBarShow}/>
          <div className="grid_desktop_3 grid_tablet_6 cart">
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
