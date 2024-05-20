import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getItems, createItem, updateItem, deleteItem } from '../services/crudService';
import { Item } from '../types';

// Define the state interface
interface ItemState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ItemState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async actions
export const fetchItems = createAsyncThunk<Item[]>('items/fetchItems', async () => {
  const response = await getItems();
  return response;
});

export const addItem = createAsyncThunk<Item, Item>('items/addItem', async (item) => {
  const response = await createItem(item);
  return response;
});

export const editItem = createAsyncThunk<Item, { id: string; item: Item }>(
  'items/editItem',
  async ({ id, item }) => {
    const response = await updateItem(id, item);
    return response;
  }
);

export const removeItem = createAsyncThunk<string, string>('items/removeItem', async (id) => {
  await deleteItem(id);
  return id;
});

// Create slice
const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch items';
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.items.push(action.payload);
      })
      .addCase(editItem.fulfilled, (state, action: PayloadAction<Item>) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default itemSlice.reducer;
