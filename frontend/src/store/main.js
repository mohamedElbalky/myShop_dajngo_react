import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice"

export default configureStore({
  reducer: {
    products: productReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     // Enable Redux DevTools if it's installed
  //     // debug: process.env.NODE_ENV === 'development',
  //   }),
});
