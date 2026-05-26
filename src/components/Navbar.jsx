import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate total number of items in cart (sum of quantities)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ E-Shop
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
