import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers/blogsReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";

const bigReducer = combineReducers({
  loadedProfile: mainReducer,
})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
