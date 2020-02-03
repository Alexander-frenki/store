import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({isShow, setIsNavBarShow}) {
  return (
    <div className={`grid_desktop_6 navbar ${isShow ? 'active': ''}`}>
      <nav>
        <ul>
          <li onClick={()=>setIsNavBarShow(!isShow)}>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li onClick={()=>setIsNavBarShow(!isShow)}>
            <NavLink to="/collections/iphone">Iphone</NavLink>
          </li>
          <li onClick={()=>setIsNavBarShow(!isShow)}>
            <NavLink to="/collections/ipad">Ipad</NavLink>
          </li>
          <li onClick={()=>setIsNavBarShow(!isShow)}>
            <NavLink to="/collections/macbook">Macbook</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
