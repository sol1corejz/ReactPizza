import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortItem = {
  name: string, 
  sortProperty: 'rating' | 'price' | 'title'
}

interface FilterSliceState {
  searchValue: string
  categoryId: number
  sort: SortItem
  currentPage: number
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: { name: 'популярности', sortProperty: 'rating' },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if(Object.keys(action.payload).length){
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating'
        }
      }
      
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
