import { createSlice } from "@reduxjs/toolkit";

const initialState = { favoritesByUser: {} };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { userId, product } = action.payload;
      if (!userId) return;
      if (!state.favoritesByUser) state.favoritesByUser = {};
      if (!state.favoritesByUser[userId]) state.favoritesByUser[userId] = [];
      const userFavorites = state.favoritesByUser[userId];
      const existingIndex = userFavorites.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) { userFavorites.splice(existingIndex, 1); } else { userFavorites.push(product); }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectUserFavorites = (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return [];
  return state.favorites?.favoritesByUser?.[userId] || [];
};

export const selectIsFavorite = (productId) => (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return false;
  const userFavorites = state.favorites?.favoritesByUser?.[userId] || [];
  return userFavorites.some((item) => item.id === productId);
};

export default favoritesSlice.reducer;