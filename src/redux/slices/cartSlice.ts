import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: string;
  count: number
}

interface CartSliceState {
  totalPrice: number
  items: CartItemType[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => (sum += obj.price * obj.count), 0);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
        if (findItem && findItem.count > 1) {
          state.totalPrice -= findItem.price;
          findItem.count--;
        } else if(findItem) {
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.totalPrice -= findItem.price;
        }
      
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
      if(findItem)
        state.totalPrice -= findItem.price * findItem.count;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item: CartItemType) => item.id === id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
