import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thuckAPI) => {
    const { rejectWithValue } = thuckAPI;
    try {
      const response = await axios.get("/api/products/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
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
  error: null,
  loading: false,
  products: [],
  productDetails: {},

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
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
        // console.log(action.payload);
      })

      // getOneProduct
      .addCase(getProductDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
        console.log(action.payload);
      })
  },
});

export default productSlice.reducer;
