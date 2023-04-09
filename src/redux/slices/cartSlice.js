import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => (sum += obj.price * obj.count), 0);
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem.count > 1) {
        state.totalPrice -= findItem.price;
        findItem.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (state, action) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice -= findItem.price * findItem.count;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
