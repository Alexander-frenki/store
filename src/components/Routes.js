import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Main from "../pages/Main";
import Cart from "../pages/Cart";
import Collection from "../pages/Collection";
import Product from "../pages/Product";

function Routes() {
  return (
    <>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/collections">
        <Collections />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
    </>
  );
}

function Collections() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:collectionID`}>
      <Collection />
    </Route>
  );
}

function Products() {
  let { path } = useRouteMatch();

  return (
    <Route path={`${path}/:productGroup/:productHandle`}>
      <Product />
    </Route>
  );
}

export default Routes;
