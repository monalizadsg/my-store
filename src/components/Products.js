import React, { useContext, useState, useEffect } from "react";
import { Card, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../config/Config";
import "./Products.scss";
import Header from "./Header";
import { CartContext } from "./../global/CartContext";
import Loading from "./Loading";
import { ToastContext } from "../global/ToastContext";
import _debounce from "lodash/debounce";

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
  const { dispatch, shoppingCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newProducts = [];
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
      });
      if (searchValue) {
        const filteredProducts = newProducts.filter((product) => {
          return product.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setIsLoading(false);
        setProducts(filteredProducts);
      } else {
        setIsLoading(false);
        setProducts(newProducts);
      }
    });
  }, [searchValue]);

  const handleAddToCart = (item) => {
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

  const debouncedSetSearchValue = _debounce(
    (value) => setSearchValue(value),
    1000
  );

  const onChangeSearchInput = (event) => {
    debouncedSetSearchValue(event.target.value);
  };

  return (
    <>
      <Header onChangeSearchInput={onChangeSearchInput} renderSearch={true} />
      <div className='products-wrapper'>
        {products.length !== 0 && (
          <Typography variant='h5'>Products</Typography>
        )}
        <div className='card-container'>
          {isLoading && (
            <div className='loading'>
              <Loading isLoading={isLoading} />
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
          {products.length === 0 && !isLoading && (
            <div className='empty'>No items available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
