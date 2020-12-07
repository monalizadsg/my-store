import React from "react";
import AppRouter from "./app/AppRouter";
import { ProductsContextProvider } from "./global/ProductsContext";

function App() {
  return (
    <React.Fragment>
      <ProductsContextProvider>
        <AppRouter />
      </ProductsContextProvider>
    </React.Fragment>
  );
}

export default App;
