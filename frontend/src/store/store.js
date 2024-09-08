import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// Combine the reducers
const rootReducer = combineReducers({ user: userReducer });

// Persist config
const persistConfig = {
    key: "root",
    version: 1, // Optional, only include if needed
    storage,
};

// Apply persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Necessary for redux-persist
        }),
    devTools: process.env.NODE_ENV !== "production",
});

// Create the persistor to handle rehydration of persisted state
export const persistor = persistStore(store);
