import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../config/Config";
import { Container, AppBar, List, Typography, Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import { CartContext } from "./../global/CartContext";
import "./Header.scss";
import SearchBar from "./SearchBar";

const navLinks = [
  { title: "login", path: "/login", icon: <PersonIcon /> },
  { title: "cart", path: "/my-cart", icon: <ShoppingCartIcon /> },
];

const Header = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const { totalQty } = useContext(CartContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              const userName = snapshot.data().FirstName;
              setUser(userName);
            }
          });
      } else {
        setUser(null);
      }
    });
  }, []);

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
          {props.renderSearch && (
            <div className='searh-bar'>
              <SearchBar
                onChange={(event) => props.onChangeSearchInput(event)}
              />
            </div>
          )}

          {!user && (
            <List
              component='nav'
              aria-labelledby='main navigation'
              className='navbar-list'
            >
              {navLinks.map(({ title, path, icon }) => (
                <Link to={path} key={title} className='nav-link'>
                  {title === "cart" ? (
                    <div className='cart'>
                      <span>{icon}</span>
                      <div className='cart-qty'>{totalQty}</div>
                    </div>
                  ) : (
                    <span>{icon}</span>
                  )}
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
