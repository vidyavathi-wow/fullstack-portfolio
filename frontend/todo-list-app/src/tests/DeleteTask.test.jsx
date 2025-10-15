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


describe("Delete Task functionality", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("deletes a task", () => {
    render(<TodoList />);

    // Add a task first
    const input = screen.getByPlaceholderText("Enter task item");
    fireEvent.change(input, { target: { value: "Task To Delete" } });
    fireEvent.click(screen.getByText("Add Task"));

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Task To Delete")).not.toBeInTheDocument();
    expect(toast.error).toHaveBeenCalledWith('Task "Task To Delete" deleted');
  });
});
