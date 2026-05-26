import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage or return an empty array if none exists
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('ecom_cart');
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (error) {
      console.error("Error parsing cart data from localStorage", error);
      return [];
    }
  }
  return [];
};

const initialState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product already exists
        existingItem.quantity += 1;
      } else {
        // Add new product to cart
        state.items.push({ ...product, quantity: 1 });
      }
      // Sync to localStorage
      localStorage.setItem('ecom_cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      // Sync to localStorage
      localStorage.setItem('ecom_cart', JSON.stringify(state.items));
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      localStorage.setItem('ecom_cart', JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity -= 1;
        // If quantity becomes 0, remove the item
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        }
      }
      localStorage.setItem('ecom_cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('ecom_cart');
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
