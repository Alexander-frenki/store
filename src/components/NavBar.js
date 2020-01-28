import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/collections/iphone">Iphone</NavLink>
        </li>
        <li>
          <NavLink to="/collections/ipad">Ipad</NavLink>
        </li>
        <li>
          <NavLink to="/collections/macbook">Macbook</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
