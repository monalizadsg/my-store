import React, { useState } from "react";
import { Grid, Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "../components/TextInput";
import { auth } from "../config/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageDisplay: {
    width: "80%",
    height: "90vh",
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(3),
    height: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  linkTextDisplay: {
    textDecoration: "none",
    fontWeight: 400,
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setError("Incorrect email or password");
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError("");
        history.push("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const validateForm = () => {
    if (email === "" || password === "") {
      setError("Incorrect email or password");
      return false;
    }

    return true;
  };

  return (
    <div className={`login-wrapper ${classes.pageDisplay}`}>
      <Container className={classes.container} maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
                    type='email'
                    name='email'
                    label='Email'
                    value={email}
                    onChange={handleEmailChange}
                    error={error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
                    type='password'
                    name='password'
                    label='Password'
                    value={password}
                    onChange={handlePasswordChange}
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} style={{ marginTop: 15 }}>
          <Typography variant='body1'>
            Don't have an account? Register
            <Link to='/signup' className={classes.linkTextDisplay}>
              {" "}
              Here
            </Link>
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
