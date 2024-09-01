import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    })
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);   
  };

  const handleCheckout = () => {
    alert('Coming soon!');
  }

  const handleIncrement = (item) => {
    item = {
      ...item,
      quantity: item.quantity + 1,
    };
    dispatch(updateQuantity(item));
  };

  const handleDecrement = (item) => {
    item = {
      ...item,
      quantity: item.quantity - 1,
    };
    if (item.quantity > 0) {
        dispatch(updateQuantity(item));
    } else {
        handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateSubTotalCost = (item) => {
    return parseInt(item.cost.slice(1)) * item.quantity;
  }

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = () => {
    let total = 0;
    cart.forEach((item) => {
      total += parseInt(item.cost.slice(1)) * item.quantity;
    });
    return total;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: {calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateSubTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>Total Cart Cost: ${calculateTotalCost()}</div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


