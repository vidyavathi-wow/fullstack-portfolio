import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import booksReducer from './features/booksSlice';
import preferenceReducer from './features/preferencesSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    preferences: preferenceReducer,
  },
});

export default store;
