import { createSlice } from '@reduxjs/toolkit';
const initialState = { items: [] };
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push({ ...action.payload, id: state.items.length + 1 });
    },
    editTask: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((_, i) => i !== action.payload);
    },
    toggleTask: (state, action) => {
      const index = action.payload;
      state.items[index].isCompleted = !state.items[index].isCompleted;
    },
    setTasks: (state, action) => {
      state.items = action.payload;
    },
  },
});
export const { addTask, editTask, deleteTask, toggleTask, setTasks } =
  todosSlice.actions;
export default todosSlice.reducer;
