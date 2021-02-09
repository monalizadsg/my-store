export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state;

  let product;
  let index;
  let updatedPrice;
  let updatedQty;

  switch (action.type) {
    case "ADD_TO_CART":
      product = action.product;
      product["qty"] = 1;
      product["totalProductPrice"] = product.price * product.qty;
      updatedQty = totalQty + 1;
      updatedPrice = totalPrice + product.price;
      return {
        shoppingCart: [product, ...shoppingCart],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };

    case "INC":
      product = action.cart;
      product.qty = ++product.qty;
      product.totalProductPrice = product.qty * product.price;
      updatedQty = totalQty + 1;
      updatedPrice = totalPrice + product.price;
      index = shoppingCart.findIndex((cart) => cart.id === action.id);
      shoppingCart[index] = product;
      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };

    case "DEC":
      product = action.cart;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        product.totalProductPrice = product.qty * product.price;
        updatedQty = totalQty - 1;
        updatedPrice = totalPrice - product.price;
        index = shoppingCart.findIndex((cart) => cart.id === action.id);
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          totalQty: updatedQty,
        };
      } else {
        return state;
      }

    case "DELETE":
      const filtered = shoppingCart.filter(
        (product) => product.id !== action.id
      );
      product = action.cart;
      updatedQty = totalQty - product.qty;
      updatedPrice = totalPrice - product.qty * product.price;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };

    case "EMPTY":
      return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0,
      };

    default:
      return state;
  }
};
