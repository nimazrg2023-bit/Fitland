import { createSlice } from "@reduxjs/toolkit";

const initialState = { addressesByUser: {} };

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const { userId, address } = action.payload;
      if (!userId) return;
      if (!state.addressesByUser[userId]) state.addressesByUser[userId] = [];
      state.addressesByUser[userId].push({ id: Date.now(), ...address });
    },
    removeAddress: (state, action) => {
      const { userId, addressId } = action.payload;
      if (!userId || !state.addressesByUser[userId]) return;
      state.addressesByUser[userId] = state.addressesByUser[userId].filter((a) => a.id !== addressId);
    },
    updateAddress: (state, action) => {
      const { userId, address } = action.payload;
      if (!userId || !state.addressesByUser[userId]) return;
      const idx = state.addressesByUser[userId].findIndex((a) => a.id === address.id);
      if (idx !== -1) state.addressesByUser[userId][idx] = address;
    },
  },
});

export const { addAddress, removeAddress, updateAddress } = addressesSlice.actions;

export const selectUserAddresses = (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return [];
  return state.addresses?.addressesByUser?.[userId] || [];
};

export default addressesSlice.reducer;