import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList/TodoList.jsx';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../redux/features/todosSlice.js';
import React from 'react';

const renderWithRedux = (ui, { initialState } = {}) => {
  const store = configureStore({
    reducer: { todos: todosReducer },
    preloadedState: initialState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('TodoList Component', () => {
  const initialTodos = [
    { id: '1', task: 'Task 1', category: 'Work', isCompleted: false },
    { id: '2', task: 'Task 2', category: 'Personal', isCompleted: true },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders initial tasks', () => {
    renderWithRedux(<TodoList />, {
      initialState: { todos: { items: initialTodos } },
    });
    expect(screen.getByText('Task 1 (Work)')).toBeInTheDocument();
    expect(screen.getByText('Task 2 (Personal)')).toBeInTheDocument();
  });

  it('adds a new task', () => {
    renderWithRedux(<TodoList />, { initialState: { todos: { items: [] } } });

    const input = screen.getByPlaceholderText('Enter task item');
    const dropdown = screen.getAllByRole('combobox')[0]; // first select
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.change(dropdown, { target: { value: 'Work' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Task (Work)')).toBeInTheDocument();
  });

  it('edits a task', () => {
    renderWithRedux(<TodoList />, {
      initialState: { todos: { items: initialTodos } },
    });

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    const input = screen.getByPlaceholderText('Enter task item');
    const updateButton = screen.getByText('Update Task');

    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.click(updateButton);

    expect(screen.getByText('Updated Task (Work)')).toBeInTheDocument();
  });

  it('deletes a task', () => {
    renderWithRedux(<TodoList />, {
      initialState: { todos: { items: initialTodos } },
    });

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('Task 1 (Work)')).not.toBeInTheDocument();
  });

  it('toggles task completion', () => {
    renderWithRedux(<TodoList />, {
      initialState: { todos: { items: initialTodos } },
    });

    const toggleButtons = screen.getAllByText('Mark Complete');
    fireEvent.click(toggleButtons[0]);

    const undoButtons = screen.getAllByText('Undo');
    expect(undoButtons[0]).toBeInTheDocument();
  });
});
