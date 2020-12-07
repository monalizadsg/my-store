import React, { useContext } from "react";
import { ProductsContext } from "./../global/ProductsContext";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import "./Products.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 100,
    paddingTop: "75%", // 16:9
  },
}));

const Products = () => {
  const { products } = useContext(ProductsContext);
  const classes = useStyles();

  console.log(products);

  return (
    <div className='products-wrapper'>
      {products.length !== 0 && <Typography variant='h4'>Products</Typography>}
      <div className='card-container'>
        {products.length === 0 && (
          <div>slow internet...no products to display</div>
        )}
        {products.map((product) => (
          <Card className={`card ${classes.root}`}>
            <CardMedia
              className={classes.media}
              // component='img'
              // height='140'
              image={product.img}
              title={product.name}
            />
            <CardContent>
              <div>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {product.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {`P${product.price}.00`}
                </Typography>
              </div>
              <div>
                <ShoppingCartIcon />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    // <h1>Products</h1>
  );
};

export default Products;
