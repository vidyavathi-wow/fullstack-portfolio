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
describe("Add Task functionality", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("adds a new task when Add Task is clicked", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Enter task item");
    fireEvent.change(input, { target: { value: "New Task" } });

    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Task "New Task" added');
  });

  test("does not add empty task", () => {
    render(<TodoList />);
    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    expect(screen.queryByText("New Task")).not.toBeInTheDocument();
  });
});
