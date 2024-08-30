import { combineReducers } from "redux";
import { shoppingCartReducer } from "./reducers";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export const removePersistedData = () => {
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};

export type RootState = ReturnType<typeof store.getState>;
