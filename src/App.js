import React from "react";
import { Route, Switch } from "react-router-dom";
import { CartContextProvider } from "./global/CartContext";
import { ProductsContextProvider } from "./global/ProductsContext";
import { UserContextProvider } from "./global/UserContext";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Cashout from "./components/Cashout";
import ToastContextProvider from "./global/ToastContext";
import Toast from "./components/Toast";

function App() {
  return (
    <React.Fragment>
      <ProductsContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <ToastContextProvider>
              <Switch>
                <Route exact component={Products} path='/' />
                <Route component={AddProduct} path='/add-product' />
                <Route component={Cart} path='/my-cart' />
                <Route component={Cashout} path='/cashout' />
                <Route component={Login} path='/login' />
                <Route component={Signup} path='/signup' />
              </Switch>
              <Toast />
            </ToastContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </React.Fragment>
  );
}

export default App;
