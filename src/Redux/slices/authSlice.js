import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [], user: null, pendingLogin: null, isLoggedIn: false, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin: (state, action) => {
      const value = String(action.payload).trim();
      const normalizedValue = value.toLowerCase();
      const existing = state.users.find((u) => {
        const phone = String(u.phone || "").trim();
        const email = String(u.email || "").trim().toLowerCase();
        return phone === value || email === normalizedValue;
      });
      if (existing) {
        const isPhone = String(existing.phone || "").trim() === value;
        state.pendingLogin = { value, type: isPhone ? "phone" : "email", userId: existing.id };
        state.error = null;
      } else {
        state.pendingLogin = null;
        state.error = "این شماره/ایمیل ثبت‌نام نشده. لطفا ابتدا ثبت‌نام کنید.";
      }
      state.isLoggedIn = false;
    },
    verifyCode: (state, action) => {
      if (!state.pendingLogin) { state.error = "جلسه ورود منقضی شده. لطفا دوباره وارد شوید."; return; }
      const user = state.users.find((u) => u.id === state.pendingLogin.userId);
      if (user) { state.user = user; state.isLoggedIn = true; state.error = null; } else { state.error = "کاربر یافت نشد."; }
      state.pendingLogin = null;
    },
    register: (state, action) => {
      const { name, phone, email } = action.payload;
      const duplicate = state.users.find((u) => u.phone === phone || (email && u.email === email));
      if (duplicate) { state.error = "این شماره/ایمیل قبلاً ثبت‌نام شده. لطفا وارد شوید."; return; }
      const newUser = { id: 1, name, phone, email: email || "", avatar: "/nike2.png", addresses: [], isProfileComplete: true };
      state.users.push(newUser);
      state.user = newUser;
      state.isLoggedIn = true;
      state.pendingLogin = null;
      state.error = null;
    },
    updateProfile: (state, action) => {
      if (!state.user) return;
      const updated = { ...state.user, ...action.payload };
      state.user = updated;
      const idx = state.users.findIndex((u) => u.id === updated.id);
      if (idx !== -1) state.users[idx] = updated;
    },
    logout: (state) => { state.user = null; state.isLoggedIn = false; state.pendingLogin = null; state.error = null; },
    clearError: (state) => { state.error = null; },
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthError = (state) => state.auth.error;
export const selectUsers = (state) => state.auth.users;
export const selectPendingLogin = (state) => state.auth.pendingLogin;

export const { startLogin, verifyCode, register, updateProfile, logout, clearError } = authSlice.actions;

export default authSlice.reducer;