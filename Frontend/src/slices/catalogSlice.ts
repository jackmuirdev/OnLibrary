import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../api/AxiosApi";
import { Product } from "../models/product";
import { RootState } from "../store/configureStore";

interface CatalogState {
  productsLoaded: boolean;
  status: string;
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
  'catalog/fetchProductsAsync',
  async (_, thunkAPI) => {
    const params = new URLSearchParams();
    try {
      const response = await axiosApi.Catalog.list(params);
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProductAsync',
  async (productId, thunkAPI) => {
    try {
      return await axiosApi.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    status: 'idle',
  }),
  reducers: {
    setProduct: (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.productsLoaded = false;
    },
    removeProduct: (state, action) => {
      productsAdapter.removeOne(state, action.payload);
      state.productsLoaded = false;
    }
  },
  extraReducers: (builder => {
    // All products
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = 'pendingFetchProducts';
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload)
      state.status = 'idle';
    });

    // Single product
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = 'pendingFetchProduct';
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload)
      state.status = 'idle';
    });
  })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)

export const {setProduct, removeProduct} = catalogSlice.actions;
