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
          <NavLink to="/iphone">Iphone</NavLink>
        </li>
        <li>
          <NavLink to="/ipad">Ipad</NavLink>
        </li>
        <li>
          <NavLink to="/macbook">Macbook</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
