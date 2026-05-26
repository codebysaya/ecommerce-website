import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../cartSlice';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * 0.10; // 10% GST
  const grandTotal = subtotal + gst;

  const handleCheckoutSuccess = () => {
    dispatch(clearCart());
    setIsCheckoutOpen(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-container empty-cart">
        <h2>Your cart is empty! 🛒</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn-primary mt-4 inline-block">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Your Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn" 
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  className="remove-btn" 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          <Link to="/" className="back-link">
             <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>GST (10%)</span>
            <span>${gst.toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row grand-total">
            <span>Final Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <button 
            className="btn-primary w-full mt-4" 
            onClick={() => setIsCheckoutOpen(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        totalAmount={grandTotal}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
};

export default Cart;
