import React from "react";
import { useLocation } from "react-router-dom";
import "./Wearing.css";

const Wearing = () => {
  const location = useLocation();
  const { product, products } = location.state || {}; // Check if data exists

  return (
    <div className="wearing_div">
      <h1>Try Now / Try All</h1>
      {product ? (
        <div className="product_card">
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} />
          <p>Category: {product.category}</p>
        </div>
      ) : products ? (
        products.map((item, index) => (
          <div key={index} className="product_card">
            <h3>{item.name}</h3>
            <img src={item.image} alt={item.name} />
            <p>Category: {item.category}</p>
          </div>
        ))
      ) : (
        <p>No products to display</p>
      )}
    </div>
  );
};

export default Wearing;
