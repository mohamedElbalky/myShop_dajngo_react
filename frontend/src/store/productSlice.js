import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thuckAPI) => {
    const { rejectWithValue, dispatch } = thuckAPI;
    try {
      const response = await axios.get("/api/products/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (uuid, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // const { uuid } = thunkAPI.meta;

    try {
      const response = await axios.get(`/api/products/${uuid}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  products: [],
  productDetails: {},
  // error: null,
  // loading: false,
  // totalCount: 0,
  // currentPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getProducts
      .addCase(getProducts.pending, (state, action) => {
        // TODO: add spinner
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        // TODO: add error alert

        console.log(action.error.message);
      })

      // getOneProduct
      .addCase(getProductDetails.pending, (state, action) => {
        // TODO: add spinner
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        // TODO: add error alert
        console.log(action.error.message);
      })
  },
});

export default productSlice.reducer;
