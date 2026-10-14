import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartsByUser: {}, shippingCost: 50000 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      if (!userId) return;
      if (!state.cartsByUser[userId]) state.cartsByUser[userId] = [];
      const cart = state.cartsByUser[userId];
      const existing = cart.find((item) => item.id === product.id && item.size === product.size && item.color === product.color);
      if (existing) { existing.quantity += product.quantity || 1; } else { cart.push({ ...product, quantity: product.quantity || 1 }); }
    },
    removeFromCart: (state, action) => {
      const { userId, itemId, size, color } = action.payload;
      if (!userId || !state.cartsByUser[userId]) return;
      state.cartsByUser[userId] = state.cartsByUser[userId].filter((item) => !(item.id === itemId && item.size === size && item.color === color));
    },
    updateQuantity: (state, action) => {
      const { userId, itemId, size, color, quantity } = action.payload;
      if (!userId || !state.cartsByUser[userId]) return;
      const item = state.cartsByUser[userId].find((i) => i.id === itemId && i.size === size && i.color === color);
      if (item) item.quantity = Math.max(1, quantity);
    },
    clearCart: (state, action) => {
      const userId = action.payload;
      if (!userId) return;
      state.cartsByUser[userId] = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectUserCart = (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return [];
  return state.cart?.cartsByUser?.[userId] || [];
};

export const selectCartTotals = (state) => {
  const userId = state.auth?.user?.id;
  const items = userId ? state.cart?.cartsByUser?.[userId] || [] : [];
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = items.reduce((sum, item) => sum + (item.oldPrice - item.price) * item.quantity, 0);
  const shippingCost = state.cart?.shippingCost || 0;
  const payable = totalPrice + shippingCost;
  return { totalPrice, totalDiscount, shippingCost, payable };
};

export const selectCartItemCount = (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return 0;
  const items = state.cart?.cartsByUser?.[userId] || [];
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const selectCartItemsLength = (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return 0;
  const items = state.cart?.cartsByUser?.[userId] || [];
  return items.length;
};

export default cartSlice.reducer;