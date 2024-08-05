import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice"
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     // Enable Redux DevTools if it's installed
  //     // debug: process.env.NODE_ENV === 'development',
  //   }),
});
