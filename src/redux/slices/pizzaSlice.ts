import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type Pizza = {
  id: string,
  imageUrl: string
  title: string,
  types: number[],
  sizes: string[],
  price: number,
  category: number,
  rating: number
 }

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  status: Status
  items: Pizza[]
}

export type SearchPizzaParams = {
  currentPage: number;
   category: string; 
   searchQuery: string; 
   sortProperty: string; 
   orderQuery: string;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ currentPage, category, searchQuery, sortProperty, orderQuery }: SearchPizzaParams) => {
    const res = await axios.get<Pizza[]>(
      `https://64258b189e0a30d92b350f76.mockapi.io/items?limit=4&page=${currentPage}&${category}&${searchQuery}&sortBy=${sortProperty}&order=${orderQuery}`,
    );
    return res.data as Pizza[];
  },
);

const initialState: PizzaSliceState = {
  status: Status.LOADING, //loading, success, error
  items: [],
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
