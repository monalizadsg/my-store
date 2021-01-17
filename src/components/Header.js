import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { auth } from "../config/Config";
import { UserContext } from "./../global/UserContext";

const useStyles = makeStyles((theme) => ({
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "80%",
    margin: "auto",
  },
  logoText: {
    textDecoration: "none",
    color: "#232946",
    fontWeight: 500,
  },
  appBar: {
    backgroundColor: "#b8c1ec",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "#232946",
  },
}));

const navLinks = [
  { title: "sign up", path: "/signup" },
  { title: "login", path: "/login" },
  { title: "my cart", path: "/my-cart", icon: <ShoppingCartIcon /> },
];

const Header = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return (
    <div>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Container className={classes.navbarDisplayFlex}>
            <Typography variant='h4'>
              <Link to='/' className={classes.logoText}>
                MyStore
              </Link>
            </Typography>
            {!user && (
              <List
                component='nav'
                aria-labelledby='main navigation'
                className={classes.navDisplayFlex}
              >
                {navLinks.map(({ title, path, icon }) => (
                  <Link to={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                      {icon && icon}
                    </ListItem>
                  </Link>
                ))}
              </List>
            )}
            {user && (
              <List className={classes.navDisplayFlex}>
                <Link to='/' className={classes.linkText}>
                  <ListItem>{user}</ListItem>
                </Link>
                <Link to='/my-cart' className={classes.linkText}>
                  <ListItem>
                    <ShoppingCartIcon />
                  </ListItem>
                </Link>
                <span>
                  <Button onClick={handleLogout} variant='contained'>
                    LOGOUT
                  </Button>
                </span>
              </List>
            )}
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
