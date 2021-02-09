import React, { useContext } from "react";
import { ProductsContext } from "./../global/ProductsContext";
import { Card, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Products.scss";
import Header from "./Header";
import { CartContext } from "./../global/CartContext";
import Loading from "./Loading";
import { ToastContext } from "../global/ToastContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 60,
    paddingTop: "70%", // 16:9
  },
}));

const Products = () => {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);
  const { dispatch, shoppingCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const handleAddToCart = (item) => {
    console.log(shoppingCart);
    const isItemAdded = shoppingCart.find((product) => product.id === item.id);

    if (isItemAdded) {
      showToast("Item is already in your cart!", "warning");
    } else {
      dispatch({
        type: "ADD_TO_CART",
        id: item.id,
        product: item,
      });
      showToast("Item added to cart!", "success");
    }
  };

  return (
    <>
      <Header />
      <div className='products-wrapper'>
        {products.length !== 0 && (
          <Typography variant='h5'>Products</Typography>
        )}
        <div className='card-container'>
          {products.length === 0 && (
            <div className='loading'>
              <Loading isLoading='true' />
            </div>
          )}
          {products.map((product) => (
            <div key={product.name} className='card'>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={product.img}
                  title={product.name}
                />
                <div className='content'>
                  <div className='add-to-cart'>
                    <button
                      className='add-to-cart-btn'
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Card>
              <div className='product-details'>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {product.name}
                </Typography>
                <Typography variant='body2' component='p'>
                  {`P${product.price}.00`}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
