import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { auth, db } from "../config/Config";
import TextInput from "../components/TextInput";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "./../global/CartContext";
import { ToastContext } from "../global/ToastContext";
import Header from "./Header";
import "./Cashout.scss";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Cashout = () => {
  const classes = useStyles();
  const history = useHistory();
  const { showToast } = useContext(ToastContext);
  const { totalPrice, totalQty, dispatch } = useContext(CartContext);
  const initialDetails = {
    phoneNumber: "",
    address: "",
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState(initialDetails);
  const [error, setError] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      } else {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            setName(snapshot.data().Name);
            setEmail(snapshot.data().Email);
          });
      }
    });
  });

  const handleInputChange = ({ target: input }) => {
    const { name, value } = input;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    //store buyer details to firestore
    auth.onAuthStateChanged((user) => {
      if (user) {
        const date = new Date();
        const time = date.getTime();
        db.collection("Buyer-info " + user.uid)
          .doc("_" + time)
          .set({
            BuyerName: name,
            BuyerEmail: email,
            BuyerPhoneNumber: details.phoneNumber,
            BuyerAddress: details.address,
            BuyerPayment: totalPrice,
            BuyerQuantity: totalQty,
          })
          .then(() => {
            setDetails({ ...details, phoneNumber: "", address: "" });
            dispatch({ type: "EMPTY" });
            showToast(
              "Your order has been placed! You will be redirected to home page after 8seconds."
            );
            setTimeout(() => {
              history.push("/");
            }, 8000);
          });
      }
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (details.phoneNumber === "") {
      errors.phoneNumber = "This field is required";
    }
    if (details.address === "") {
      errors.address = "This field is required";
    }

    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    setError(errors);

    return isValid;
  };

  return (
    <>
      <Header />
      <div className='cashout'>
        <div className='form'>
          <Container className={classes.container} maxWidth='xs'>
            <Grid item xs={12} className='header'>
              <Typography variant='h4'>Cashout Details</Typography>
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
                        value={name}
                        error={error.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        fullWidth
                        type='email'
                        name='email'
                        label='Email'
                        value={email}
                        error={error.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        fullWidth
                        type='number'
                        name='phoneNumber'
                        label='Phone Number'
                        value={details.phoneNumber}
                        onChange={handleInputChange}
                        error={error.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        fullWidth
                        type='text'
                        name='address'
                        label='Delivery Address'
                        value={details.address}
                        onChange={handleInputChange}
                        error={error.address}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        fullWidth
                        type='number'
                        name='Total Payment'
                        label='Total Payment'
                        value={totalPrice}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        fullWidth
                        type='number'
                        name='Total Qty'
                        label='Total Quantity'
                        value={totalQty}
                        disabled
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
                  >
                    Proceed
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Cashout;
