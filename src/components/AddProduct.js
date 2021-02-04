import React, { useState, useRef } from "react";
import {
  Grid,
  Button,
  Container,
  Typography,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { db, storage } from "../config/Config";
import TextInput from "../components/TextInput";
import { makeStyles } from "@material-ui/core/styles";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const AddProduct = () => {
  const classes = useStyles();
  const imageFileRef = useRef();
  const initialProduct = {
    name: "",
    price: "",
    image: null,
  };
  const [product, setProduct] = useState(initialProduct);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const types = ["image/png", "image/jpeg"]; // image types

  const handleInputChange = ({ target: input }) => {
    const { name, value } = input;
    setProduct({ ...product, [name]: value });
  };

  const handleImageInput = ({ target: input }) => {
    let selectedFile = input.files[0];
    console.log(selectedFile);
    setProduct({ ...product, image: selectedFile });
  };

  const handleSubmit = async (event) => {
    const image = product.image;
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                ProductName: product.name,
                ProductPrice: Number(product.price),
                ProductImg: url,
              })
              .then(() => {
                setProduct({ ...product, name: "", price: 0, image: null });
                imageFileRef.current.value = "";
                setError("");
                setIsLoading(false);
              })
              .catch((err) => console.log(err));
          });
      }
    );
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (product.name === "") {
      errors.name = "This field is required.";
    }
    if (product.price === "") {
      errors.price = "This field is required";
    }
    if (product.image === null) {
      errors.image = "This field is required";
    } else if (product.image && !types.includes(product.image.type)) {
      errors.image = "Please select a valid image type (jpg or png)";
    }

    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    setError(errors);

    return isValid;
  };

  return (
    <div className='signup-wrapper'>
      <div className='form'>
        <Container className={classes.container} maxWidth='xs'>
          <Grid item xs={12} className='header'>
            <Typography variant='h4'>Add Product</Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextInput
                      fullWidth
                      name='name'
                      label='Name'
                      value={product.name}
                      onChange={handleInputChange}
                      error={error.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      fullWidth
                      type='number'
                      name='price'
                      label='Price'
                      value={product.price}
                      onChange={handleInputChange}
                      error={error.price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type='file'
                      name='image'
                      size='medium'
                      label='Image'
                      variant='outlined'
                      onChange={handleImageInput}
                      error={!!error.image}
                      helperText={error.image}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <ImageOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={imageFileRef}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color='primary'
                  fullWidth
                  type='submit'
                  variant='contained'
                  disabled={isLoading}
                >
                  {!isLoading ? "Add" : "Adding"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AddProduct;
