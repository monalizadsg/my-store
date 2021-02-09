import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  List,
  Typography,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { auth } from "../config/Config";
import { UserContext } from "./../global/UserContext";
import { CartContext } from "./../global/CartContext";
import "./Header.scss";

const navLinks = [
  { title: "sign up", path: "/signup" },
  { title: "login", path: "/login" },
  { title: "cart", path: "/my-cart", icon: <ShoppingCartIcon /> },
];

const Header = () => {
  const { user } = useContext(UserContext);
  const { totalQty } = useContext(CartContext);
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return (
    <div>
      <AppBar position='fixed' className='header'>
        <Container className='nav-container'>
          <Typography variant='h5'>
            <Link to='/' className='logo'>
              TeeShop
            </Link>
          </Typography>
          {!user && (
            <List
              component='nav'
              aria-labelledby='main navigation'
              className='navbar-list'
            >
              {navLinks.map(({ title, path, icon }) => (
                <Link to={path} key={title} className='nav-link'>
                  <ListItem button>
                    <ListItemText primary={title} />
                    {icon && (
                      <div className='cart'>
                        <span>{icon}</span>
                        <div className='cart-qty'>{totalQty}</div>
                      </div>
                    )}
                  </ListItem>
                </Link>
              ))}
            </List>
          )}
          {user && (
            <List className='navbar-list'>
              <div className='user-name'> Hello, {user}</div>
              <div className='cart'>
                <Link to='/my-cart'>
                  <ShoppingCartIcon />
                </Link>
                <div className='cart-qty'>{totalQty}</div>
              </div>
              <div className='logout-btn'>
                <Button onClick={handleLogout}>LOGOUT</Button>
              </div>
            </List>
          )}
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
