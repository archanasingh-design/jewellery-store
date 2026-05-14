import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'; 

// image import
import Image1 from './assets/1.jpg'; 
import Image2 from './assets/2.jpg';
import Image3 from './assets/3.jpg';
import Image4 from './assets/4.jpg';
import Image5 from './assets/5.jpg';
import Image6 from './assets/6.jpg';
import Image7 from './assets/7.jpg';
import Image8 from './assets/8.jpg';
import Image9 from './assets/9.jpg';
// gallery image 
import chain1 from './assets/chain1.jpg';
import chain2 from './assets/chain2.jpg';
import bracelets1 from './assets/bracelets1.jpg';
import bracelets2 from './assets/bracelets2.jpg';
import ring1 from './assets/ring1.jpg';
import ring2 from './assets/ring2.jpg';
import ring3 from './assets/ring3.jpg';
import realring1 from './assets/realring1.jpg';
import realring2 from './assets/realring2.jpg';
import pouch3 from './assets/pouch3.jpg';
import pouch4 from './assets/pouch4.jpg';
import pouch2 from './assets/pouch2.jpg';
import chain3 from './assets/chain3.jpg';
import chain4 from './assets/chain4.jpg';

const initialProducts = [
  { id: 1, name: "Simple Chain", price: "9.99", image: Image1, gallery: [Image1, chain1, chain2], desc: "Pure magic." },
  { id: 2, name: "Bracelets", price: "12.99", image: Image2, gallery: [Image2, bracelets1, bracelets2], desc: "Simple Bracelets." },
  { id: 3, name: "Ring", price: "7.99", image: Image3, gallery: [Image3, ring1, ring2, ring3], desc: "Cute and classy." },
  { id: 4, name: "Royal Chain", price: "15.00", image: Image4, gallery: [Image4, chain1, chain2], desc: "Relatable vibe!" },
  { id: 5, name: "Ring", price: "25.99", image: Image5, gallery: [Image5, realring1, realring2], desc: "Pair ring." },
  { id: 6, name: "Accessorie Box", price: "10.00", image: Image6, gallery: [Image6, pouch3, pouch4], desc: "with key chain" },
  { id: 7, name: "Teddy Bear", price: "8.50", image: Image7, gallery: [Image7, Image7, Image7], desc: "Desi Teddy." },
  { id: 8, name: "Box", price: "19.99", image: Image8, gallery: [Image8, pouch3, pouch4], desc: "Pure elegance." },
  { id: 9, name: "Pouch", price: "11.00", image: Image9, gallery: [Image9, pouch2], desc: "Simple accessorie pouch." },
  { id: 10, name: "Beautiful Chain", price: "30.00", image: Image1, gallery: [Image1, chain3, chain4], desc: "Special for you." },
];

// --- 1. HOME PAGE ---
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-section">
        <h1>Get Your Jewels!</h1>
        <p>It's about how you feel. Pick something that makes you smile every time you look in the mirror..</p>
      </div>
      <div className="product-grid">
        {initialProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className="price-tag">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// --- 2. PRODUCT DETAIL PAGE ---
const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const product = initialProducts.find((p) => p.id === parseInt(id));
  
  // Logic: price change according to size
  const sizePrices = {
    "3 X 3": 0,
    "4 X 4": 5.00,
    "5.5 X 5.5": 10.00
  };

  const [selectedSize, setSelectedSize] = useState("3 X 3");
  const [mainImg, setMainImg] = useState(product ? product.image : null);

  if (!product) return <div style={{padding: "100px", textAlign: "center"}}><h2>Product not found!</h2></div>;

  // Final price 
  const currentPrice = (parseFloat(product.price) + sizePrices[selectedSize]).toFixed(2);

  return (
    <div className="product-detail-page">
      <div className="back-nav">
        <button className="back-btn" onClick={() => navigate('/')}>← Back To All Products</button>
      </div>
      <div className="detail-container">
        <div className="detail-left">
          <div className="main-image-box">
            <img src={mainImg || product.image} alt={product.name} /> 
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {product.gallery && product.gallery.map((img, index) => (
              <div key={index} onClick={() => setMainImg(img)} style={{ width: '80px', height: '80px', border: mainImg === img ? '2px solid #d893b5' : '1px solid #ddd', padding: '5px', cursor: 'pointer' }}>
                <img src={img} alt={`gallery-${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
        <div className="detail-right">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-tagline">{product.desc}</p>
          {/* Dynamic Price  */}
          <h2 className="detail-price">${currentPrice}</h2>
          <div className="options-row">
            <div className="option-group">
              <label>Qty.</label>
              <input type="number" defaultValue="1" min="1" className="qty-input" />
            </div>
            <div className="option-group">
              <label>Size</label>
              <select 
                className="size-select" 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="3 X 3">3 X 3</option>
                <option value="4 X 4">4 X 4</option>
                <option value="5.5 X 5.5">5.5 X 5.5</option>
              </select>
            </div>
          </div>
          {/* in Cart new price show*/}
          <button className="main-add-btn" onClick={() => addToCart({...product, price: currentPrice, size: selectedSize})}>
            <svg viewBox="0 0 576 512" width="20" height="20" fill="white" style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 3. CART PAGE ---
const CartPage = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-header">
        <span>PRODUCT</span>
        <span>QUANTITY</span>
        <span>PRICE</span>
        <span>REMOVE</span>
      </div>
      {cart.length === 0 ? <p style={{textAlign:'center', marginTop:'20px'}}>Your cart is empty.</p> : 
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="cart-prod-desc">
              <img src={item.image} alt={item.name} />
              <div>
                <span>{item.name}</span>
                <br />
                <small style={{color: '#888'}}>Size: {item.size}</small>
              </div>
            </div>
            <div className="cart-qty">1</div>
            <div className="cart-price">${item.price}</div>
            <div className="cart-remove" onClick={() => removeFromCart(index)}>
               <svg viewBox="0 0 384 512" width="20" fill="#6b21a8"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </div>
          </div>
        ))
      }
      <div className="cart-footer">
        <div className="subtotal">
          <span>SUBTOTAL</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Check Out →</button>
        <button className="back-shopping" onClick={() => navigate('/')}>← Back To All Products</button>
      </div>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>Jewelleriss</div>
        <div className="cart-icon-container" onClick={() => navigate('/cart')}>
          <svg viewBox="0 0 576 512" width="25" fill="#d893b5"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </div>
  );
}

export default App;