import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList/TodoList";
import { vi } from "vitest";
import toast from "react-hot-toast";

vi.mock('react-hot-toast', async () => {
  return {
    __esModule: true,
    default: {
      success: vi.fn(),
      error: vi.fn(),
      loading: vi.fn(),
    },
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
  };
});

describe("Edit Task functionality", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("edits an existing task", () => {
    render(<TodoList />);

    // Add a task first
    const input = screen.getByPlaceholderText("Enter task item");
    fireEvent.change(input, { target: { value: "Old Task" } });
    fireEvent.click(screen.getByText("Add Task"));

    // Edit the added task
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByText("Update Task"));

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Task "Updated Task" updated');
  });
});
