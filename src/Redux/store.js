import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageModule from "redux-persist/lib/storage/index.js";

const storage = storageModule.default;
import authReducer from "./slices/authSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import commentsReducer from "./slices/commentsSlice.js";
import favoritesReducer from './slices/favoritesSlice.js';
import addressesReducer from "./slices/addressesSlice.js";

const rootReducer = combineReducers({ auth: authReducer, orders: ordersReducer, comments: commentsReducer, favorites: favoritesReducer, addresses: addressesReducer });

const persistConfig = { key: "root", storage, whitelist: ["auth", "orders", "comments", "favorites", "addresses"] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"] } }),
});

export const persistor = persistStore(store);