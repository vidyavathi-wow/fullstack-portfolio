import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTodo from '../pages/AddTodo';
import axiosInstance from '../api/axiosInstance';
import { vi } from 'vitest';

vi.mock('../apiClient');

describe('AddTodo Component', () => {
  beforeEach(() => {
    axiosInstance.post.mockReset();
  });

  it('renders all form fields', () => {
    render(<AddTodo />);

    // Use label text instead of placeholder for date input
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument(); // ✅ fixed
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add todo/i })
    ).toBeInTheDocument();
  });

  it('submits successfully when all fields are filled', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { message: 'Success' } });

    render(<AddTodo />);

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'New Todo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter notes/i), {
      target: { value: 'Some notes' },
    });

    // ✅ Use label text instead of placeholder for date
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2025-11-03' } });

    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalled();
    });
  });

  it('handles failed API call gracefully', async () => {
    axiosInstance.post.mockRejectedValueOnce(new Error('Network error'));

    render(<AddTodo />);

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'Fail Todo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter description/i), {
      target: { value: 'Failure desc' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter notes/i), {
      target: { value: 'Failure notes' },
    });

    // ✅ Use label instead of placeholder
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2025-11-03' } });

    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalled();
    });
  });
});
