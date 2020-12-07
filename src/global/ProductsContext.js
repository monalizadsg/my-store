import React, { createContext } from "react";
import { db } from "../config/Config";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const newProducts = this.state.products;
    db.collection("Products").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          newProducts.push({
            id: change.doc.id,
            name: change.doc.data().ProductName,
            price: change.doc.data().ProductPrice,
            img: change.doc.data().ProductImg,
          });
        }
        this.setState({
          products: newProducts,
        });
      });
    });
  }

  render() {
    return (
      <ProductsContext.Provider value={{ products: [...this.state.products] }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}
