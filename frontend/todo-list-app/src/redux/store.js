// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todosSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
