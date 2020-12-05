import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "./../components/Home";
import Products from "./../components/Products";
import AddProduct from "./../components/AddProduct";

const AppRouter = () => {
  return (
    <Switch>
      <PublicRoute exact component={Home} path='/' />
      <PrivateRoute component={Products} path='/products' />
      <PublicRoute component={AddProduct} path='/add-product' />
      {/* <PublicRoute exact component={Login} path='/login' />
      <PublicRoute exact component={Signup} path='/signup' /> */}
    </Switch>
  );
};

export default AppRouter;
