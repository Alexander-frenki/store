import React from "react";
import { Route } from "react-router-dom";
import Main from "../pages/Main";
import Iphone from "../pages/Iphone";
import Ipad from "../pages/Ipad";
import Macbook from "../pages/Macbook";

function Routes() {
  return (
    <>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/iphone">
        <Iphone />
      </Route>
      <Route path="/ipad">
        <Ipad />
      </Route>
      <Route path="/macbook">
        <Macbook />
      </Route>
    </>
  );
}

export default Routes;
