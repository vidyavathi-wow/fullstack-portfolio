import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem/TodoItem.jsx';
import { describe, beforeEach, test, expect, vi } from 'vitest';

describe('TodoItem Component', () => {
  const mockItem = {
    id: '1',
    task: 'Test Task',
    category: 'Work',
    isCompleted: false,
  };

  const onDelete = vi.fn();
  const onEdit = vi.fn();
  const onToggle = vi.fn();

  beforeEach(() => {
    onDelete.mockReset();
    onEdit.mockReset();
    onToggle.mockReset();
  });

  test('renders task and category', () => {
    render(
      <TodoItem
        item={mockItem}
        index={0}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
      />
    );

    expect(screen.getByText('Test Task (Work)')).toBeInTheDocument();
  });

  test('calls onDelete when Delete button is clicked', () => {
    render(
      <TodoItem
        item={mockItem}
        index={0}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(0);
  });

  test('calls onEdit when Edit button is clicked', () => {
    render(
      <TodoItem
        item={mockItem}
        index={0}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(0);
  });

  test('calls onToggle when Mark Complete button is clicked', () => {
    render(
      <TodoItem
        item={mockItem}
        index={0}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByText('Mark Complete'));
    expect(onToggle).toHaveBeenCalledWith(0);
  });

  test('shows Undo button if task is completed', () => {
    render(
      <TodoItem
        item={{ ...mockItem, isCompleted: true }}
        index={0}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
      />
    );

    const undoButtons = screen.getAllByText('Undo');
    undoButtons.forEach((btn) => expect(btn).toBeInTheDocument());
  });
});
