import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../cartSlice';
import { products } from '../products';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Featured Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                {cartItems.some(item => item.id === product.id) ? (
                  <Link 
                    to="/cart"
                    className="btn-primary"
                    style={{ backgroundColor: '#10b981', color: 'white' }}
                  >
                    Go to Cart
                  </Link>
                ) : (
                  <button 
                    className="btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
