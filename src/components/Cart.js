import React, { useContext, useState } from "react";
import { CartContext } from "./../global/CartContext";
import { Link } from "react-router-dom";
import Header from "./Header";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { Typography, Button } from "@material-ui/core";
import ConfirmDialog from "./ConfirmDialog";
import "./Cart.scss";
import { ToastContext } from "../global/ToastContext";

const Cart = () => {
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(
    CartContext
  );
  const { showToast } = useContext(ToastContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const showDialog = (cart) => {
    setIsOpenDialog(true);
    setSelectedItem(cart);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const handleDeleteItem = () => {
    setIsLoading(true);
    const cart = selectedItem;
    dispatch({ type: "DELETE", id: cart.id, cart });
    showToast("Item removed from basket", "success");
    setIsLoading(false);
    closeDialog();
  };

  return (
    <>
      <Header />
      <div className='cart'>
        <div className='cart-header'>
          {shoppingCart.length !== 0 && <h1>Your Cart</h1>}
        </div>
        <div className='cart-card-container'>
          {shoppingCart.length === 0 && (
            <div className='cart-empty'>
              <Typography variant='h6'>No items yet. Add to cart.</Typography>
            </div>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div className='cart-card' key={cart.id}>
                <div className='cart-left-col'>
                  <div className='cart-img'>
                    <img src={cart.img} alt='product' />
                  </div>
                  <div className='cart-details'>
                    <div className='cart-name'>{cart.name}</div>
                    <div className='cart-price-original'>PHP {cart.price}</div>
                  </div>
                </div>

                <div className='cart-right-col'>
                  <div className='left-col'>
                    <div
                      className='minus-btn'
                      onClick={() =>
                        dispatch({ type: "DEC", id: cart.id, cart })
                      }
                    >
                      <RemoveOutlinedIcon />
                    </div>

                    <div className='quantity'> {cart.qty}</div>

                    <div
                      className='add-btn'
                      onClick={() =>
                        dispatch({ type: "INC", id: cart.id, cart })
                      }
                    >
                      <AddOutlinedIcon />
                    </div>
                  </div>

                  <div className='right-col'>
                    <div className='cart-price'>
                      PHP {cart.totalProductPrice}.00
                    </div>

                    <button
                      className='delete-btn'
                      onClick={() => showDialog(cart)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {shoppingCart.length > 0 && (
            <div className='cart-summary'>
              <div className='cart-summary-card'>
                <div className='cart-summary-header'>Order Summary</div>
                <div className='cart-summary-details'>
                  <div className='cart-summary-left-col'>
                    <div>Total Order</div>
                    <div>Total Quantity</div>
                  </div>

                  <div className='cart-summary-right-col'>
                    <div>PHP {totalPrice}</div>
                    <div>{totalQty}</div>
                  </div>
                </div>

                <Link to='cashout' className='cashout-link'>
                  <Button variant='contained' className='cod-btn'>
                    Cash on Delivery
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <ConfirmDialog
          isOpen={isOpenDialog}
          onClose={closeDialog}
          onDelete={handleDeleteItem}
          isLoading={isLoading}
        >
          <div>Name: {selectedItem?.name}</div>
          <div>Amount: {selectedItem?.price}</div>
          <div>Quantity: {selectedItem?.qty}</div>
        </ConfirmDialog>
      </div>
    </>
  );
};

export default Cart;
