import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, handleTryNow, handleTryAll }) => {
  return (
    <div className="cart_div">
      <h2>Cart</h2>
      {Object.values(cart).length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {Object.values(cart).map((item) => (
            <div key={item.productId} className="cart_item">
              <strong>{item.name}</strong>
              <img src={item.image} alt={item.name} className="cart_image" />
              <button
                onClick={() => removeFromCart(item.category)}
                className="remove_btn"
              >
                Remove
              </button>
              <button
                onClick={() => handleTryNow(item)}
                className="try_now_btn"
              >
                Try Now
              </button>
            </div>
          ))}
          {Object.values(cart).length > 1 && (
            <button onClick={handleTryAll} className="try_all_btn">
              Try All
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
