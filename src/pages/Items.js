import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cart from "../components/Cart"; // Import the Cart component
import "./Items.css";
import config from "../config";
import Amazon from "../assets/amazon.png";
import Flipkart from "../assets/flip.jpeg";
import Myntra from "../assets/myntra.jpeg";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HumanModel from "../components/HumanModel";

const Items = () => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCamera, setShowCamera] = useState(false); // State to show/hide camera view
  const [cameraItems, setCameraItems] = useState([]); // Holds items for the camera

  const baseURL =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL.replace(/\/$/, "")
      : config.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`, {
          params: { search },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (prevCart[product.category]) {
        toast.error(`Only one ${product.category} can be added.`);
        return prevCart;
      }
      return { ...prevCart, [product.category]: product };
    });
  };

  const removeFromCart = (category) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[category];
      toast.info(`${category} removed from the cart.`);
      return newCart;
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Function to open the camera view with a single product
  const handleTryNow = (product) => {
    setCameraItems([product]); // Set the camera with one product
    setSelectedProduct(product);
    setShowCamera(true); // Show camera view
    toast.success(`Trying on ${product.name}`);
  };

  // Function to open the camera view with all cart items
  const handleTryAll = () => {
    setCameraItems(Object.values(cart)); // Set the camera with all cart items
    setShowCamera(true); // Show camera view
    toast.success("Trying on all items in the cart");
  };

  const handleCloseCamera = () => {
    setShowCamera(false); // Close the camera and show the product grid
    setCameraItems([]);
    setSelectedProduct(null);
  };

  return (
    <div className="items_div">
      {/* Conditional rendering for Camera View */}
      {showCamera ? (
        <div className="camera_view">
          <h2>Virtual Try-On</h2>
          <button onClick={handleCloseCamera} className="close_camera_btn">
            Close Try-On
          </button>
          <div className="model_container">
            <Canvas
              camera={{ position: [0, 2, 5], fov: 50 }}
              className="canvas"
            >
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <HumanModel product={selectedProduct} />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      ) : (
        <>
          {/* Search and Product Grid */}
          <div className="left_section">
            <div className="inp_div">
              <i className="fa-solid fa-magnifying-glass-arrow-right icon"></i>
              <input
                type="search"
                className="inp_btn"
                placeholder="Search for products"
                value={search}
                onChange={handleSearch}
              />
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="error_message">{error}</p>
            ) : (
              <div className="products_grid">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.productId} className="product_card">
                      <div>
                        {" "}
                        <strong>{product.name}</strong> <br />
                        <img src={product.image} alt={product.name} />
                        <button onClick={() => addToCart(product)}>Add</button>
                      </div>
                      {/* Logos based on availableOn field */}
                      <div className="platform_logos">
                        {product.availableOn &&
                          product.availableOn.includes("amazon") && (
                            <img
                              src={Amazon}
                              alt="Amazon"
                              className="platform_logo"
                              style={{height:'20px'}}
                            />
                          )}
                        {product.availableOn &&
                          product.availableOn.includes("flipkart") && (
                            <img
                              src={Flipkart}
                              alt="Flipkart"
                              className="platform_logo"
                              style={{height:'20px'}}
                            />
                          )}
                        {product.availableOn &&
                          product.availableOn.includes("myntra") && (
                            <img
                              src={Myntra}
                              alt="Myntra"
                              className="platform_logo"
                              style={{height:'20px'}}
                            />
                          )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {/* Cart Section */}
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        handleTryNow={handleTryNow}
        handleTryAll={handleTryAll}
      />
    </div>
  );
};

export default Items;
