// src/tests/Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../components/Button.jsx";

describe("Button Component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click Me" />);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick function when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders disabled button when disabled prop is true", () => {
    render(<Button label="Can't Click" disabled />);
    const button = screen.getByText("Can't Click");
    expect(button).toBeDisabled();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Button label="Snapshot Test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
