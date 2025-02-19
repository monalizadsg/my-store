import React, { useState } from "react";
import { Grid, Button, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import { auth, db } from "../config/Config";
import { makeStyles } from "@material-ui/core/styles";
import TextInputWithIcon from "./TextInputWithIcon";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  pageDisplay: {
    width: "100%",
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formDisplay: {
    marginTop: 20,
  },
  linkTextDisplay: {
    textDecoration: "none",
    fontWeight: 400,
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const initialUserInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(initialUserInput);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = ({ target: input }) => {
    const { name, value } = input;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { firstName, lastName, email, password } = user;

    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    //create user info and store in firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("SignedUpUsersData")
          .doc(cred.user.uid)
          .set({
            FirstName: firstName,
            LastName: lastName,
            Name: `${firstName} ${lastName}`,
            Email: email,
            Password: password,
          })
          .then(() => {
            setUser({
              ...user,
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
            setError({});
            setIsLoading(false);
            props.history.push("/login");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);

        if (err.message.includes("Password")) {
          setError({
            ...error,
            password: err.message,
            confirmPassword: err.message,
          });
          setIsLoading(false);
        } else if (err.message.includes("email")) {
          setError({
            ...error,
            email: err.message,
          });
          setIsLoading(false);
        }
      });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (user.firstName === "") {
      errors.firstName = "This field is required.";
    }
    if (user.lastName === "") {
      errors.lastName = "This field is required";
    }
    if (user.email === "") {
      errors.email = "This field is required";
    }
    if (user.password === "") {
      errors.password = "This field is required";
    }
    if (user.confirmPassword === "") {
      errors.confirmPassword = "This field is required";
    } else if (user.confirmPassword !== user.password) {
      errors.confirmPassword = "Passwords does not match";
    }

    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    setError(errors);

    return isValid;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className={classes.pageDisplay}>
        <Header />
        <Container className={classes.container} maxWidth='xs'>
          <Grid item xs={12}>
            <Typography variant='h5'>Create your account</Typography>
            <Typography variant='body1'>
              Already have an account? Login
              <Link to='/login' className={classes.linkTextDisplay}>
                {" "}
                Here
              </Link>
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} className={classes.formDisplay}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextInput
                      fullWidth
                      name='firstName'
                      label='First Name'
                      value={user.firstName}
                      onChange={handleInputChange}
                      error={error.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      fullWidth
                      name='lastName'
                      label='Last Name'
                      value={user.lastName}
                      onChange={handleInputChange}
                      error={error.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      fullWidth
                      type='email'
                      name='email'
                      label='Email'
                      value={user.email}
                      onChange={handleInputChange}
                      error={error.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInputWithIcon
                      label='Password'
                      name='password'
                      showPassword={showPassword}
                      value={user.password}
                      onChange={handleInputChange}
                      onClick={handleClickShowPassword}
                      error={error.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInputWithIcon
                      label='Confirm Password'
                      name='confirmPassword'
                      showPassword={showConfirmPassword}
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                      onClick={handleClickShowConfirmPassword}
                      error={error.confirmPassword}
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
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Signup;
