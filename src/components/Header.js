import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";

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
  { title: "products", path: "/products" },
  { title: "sign up", path: "/signup" },
  { title: "login", path: "/login" },
  { title: "my cart", path: "/my-cart", icon: <ShoppingCartIcon /> },
];

const Header = () => {
  const classes = useStyles();
  // const history = useHistory();

  // const handleLogout = () => {
  //   logout();
  //   history.push("/login");
  // };

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
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
