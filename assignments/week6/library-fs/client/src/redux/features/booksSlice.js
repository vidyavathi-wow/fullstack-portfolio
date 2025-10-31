import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';
import toast from 'react-hot-toast';

export const fetchBooks = createAsyncThunk(
  'books/getBooks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/books');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (book, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/books', book);
      toast.success('Book added successfully!');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/books/${id}`);
      toast.success('Book deleted successfully!');
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/books/${id}`, updatedData);
      toast.success('Book updated successfully!');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ your backend returns { success, books }
        state.items = action.payload.books;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload.book);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.meta.arg);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const updated = action.payload.book;
        const index = state.items.findIndex((b) => b.id === updated.id);
        if (index !== -1) state.items[index] = updated;
      });
  },
});

export default booksSlice.reducer;
