import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const initialState = {
  orders: [
    {
      id: 1710000000000,
      userId: 1,
      status: "pending",
      createdAt: "2025-03-10T10:30:00.000Z",
      items: [
        { id: 1, title: 'تیشرت زنانه کد 1717', image: '/1717.png', images: ['/nike1.png', '/nike2.png', '/nike3.png', '/nike4.jpg'], price: 420000, oldPrice: 520000, rating: 4.5, reviews: 12, colors: ['#2D5A5A', '#B0B0B0', '#E8C3C3'], sizes: ['S', 'M', 'L', 'XL'], brand: 'Nike', inStock: true, discount: 20, vip: true },
        { id: 2, title: 'تیشرت زنانه کد 1777', image: '/1777.png', images: ['/nike1.png', '/nike2.png', '/nike3.png', '/nike4.jpg'], price: 200000, oldPrice: 250000, rating: 4, reviews: 8, colors: ['#7A8B99', '#E8C3C3', '#4A4A4A'], sizes: ['M', 'L', 'XL'], brand: 'Adidas', inStock: true, discount: 20, vip: false },
      ],
      address: "تهران، خیابان ولیعصر، پلاک ۱۲",
      paymentMethod: "online",
    },
    {
      id: 18100000,
      userId: 1,
      status: "pending",
      createdAt: "2025-03-10T10:30:00.000Z",
      items: [
        { id: 1, title: 'تیشرت زنانه کد 1717', image: '/1717.png', images: ['/nike1.png', '/nike2.png', '/nike3.png', '/nike4.jpg'], price: 420000, oldPrice: 520000, rating: 4.5, reviews: 12, colors: ['#2D5A5A', '#B0B0B0', '#E8C3C3'], sizes: ['S', 'M', 'L', 'XL'], brand: 'Nike', inStock: true, discount: 20, vip: true },
        { id: 2, title: 'تیشرت زنانه کد 1777', image: '/1777.png', images: ['/nike1.png', '/nike2.png', '/nike3.png', '/nike4.jpg'], price: 200000, oldPrice: 250000, rating: 4, reviews: 8, colors: ['#7A8B99', '#E8C3C3', '#4A4A4A'], sizes: ['M', 'L', 'XL'], brand: 'Adidas', inStock: true, discount: 20, vip: false },
      ],
      address: "تهران، خیابان ولیعصر، پلاک ۱۲",
      paymentMethod: "online",
    },
  ],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const items = action.payload.items || [];
      const totalPrice = items.reduce((total, item) => { return total + item.price; }, 0);
      const totalDiscount = items.reduce((total, item) => { return total + (item.price * (item.discount || 0)) / 100; }, 0);
      const finalPrice = totalPrice - totalDiscount;
      const newOrder = { id: Date.now(), status: "pending", createdAt: new Date().toISOString(), ...action.payload, totalPrice, totalDiscount, finalPrice };
      state.orders.unshift(newOrder);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = status;
    },
    cancelOrder: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order) order.status = "canceled";
    },
    removeOrder: (state, action) => { state.orders = state.orders.filter((o) => o.id !== action.payload); },
    clearOrders: (state) => { state.orders = []; },
  },
});

export const selectOrders = (state) => state.orders.orders;

export const selectUserOrders = (state) => {
  const currentUserId = state.auth.user?.id;
  if (!currentUserId) return [];
  return state.orders.orders.filter((order) => order.userId === currentUserId);
};

export const selectUserOrdersByStatus = (status) => (state) => {
  const currentUserId = state.auth.user?.id;
  if (!currentUserId) return [];
  return state.orders.orders.filter((order) => order.userId === currentUserId && order.status === status);
};

export const { createOrder, updateOrderStatus, cancelOrder, removeOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;