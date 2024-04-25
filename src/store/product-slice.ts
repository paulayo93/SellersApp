import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  id: string;
  productName: string;
  productPrice: string;
  productImage: null;
}

export interface MainState {
  products?: ProductState[] | null;
  maximumProductExceeded?: boolean;
}

const initialState = {
  products: [],
  maximumProductExceeded: false,
} as MainState;

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductState>) => {
      let prodObj = {} as ProductState;

      if (action.payload) {
        prodObj.productName = action.payload.productName;
        prodObj.productPrice = action.payload.productPrice;
        prodObj.productImage = action.payload.productImage;
        prodObj.id = action.payload.id;
      }
      state?.products?.push(prodObj);

      if (state.products?.length === 5) {
        state.maximumProductExceeded = true;
      }
    },
    resetProduct: state => {
      state.products = [];
      state.maximumProductExceeded = false;
    },

    removeProduct: (state, action: PayloadAction<ProductState>) => {
      const productId = action.payload.id;
      for (let i = 0; i < state.products.length; ++i) {
        if (state.products[i].id === productId) {
          state.products.splice(i, 1);
          break;
        }
      }
    },
  },
});
export const { addProduct, resetProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
