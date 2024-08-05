import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  async ({ uuid, qty }, thuckAPI) => {
    const { rejectWithValue, dispatch, getState } = thuckAPI;
    const { cartItems } = getState().cart;
    try {
      const { data } = await axios.get(`/api/products/${uuid}`);

      const product = {
        uuid: data.uuid,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
      };

      const result = {
        product: product,
        qty: +qty,
      };
      return result;
    } catch (err) {
      return rejectWithValue(
        err.message || "An error occurred with add to card"
      );
    }
  }
);

// get catd items from local storage
const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartItemFromStorage, // cartItems = [product:..., qty:...]
  },
  reducers: {
    RemoveFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product.uuid !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state, action) => {
        // console.log("Pending");
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItem = state.cartItems.find(
          (x) => x.product.uuid === item.product.uuid
        );
        if (existingItem) {
          existingItem.qty = item.qty;
          existingItem.product = item.product;
        } else {
          state.cartItems.push(item); // add item to cart
        }
        // add card items to local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(AddToCart.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { RemoveFromCart } = CartSlice.actions;

export default CartSlice.reducer;
