import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [customValue, setCustomValue] = useState("");

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const handleCustomChange = (e) => setCustomValue(e.target.value);
  const setCustomCount = () => {
    const value = parseInt(customValue);
    if (!isNaN(value)) setCount(value);
    setCustomValue("");
  };

  return (
    <div className="counter-container">
      <h2>React Counter App</h2>
      <div className="count-display">{count}</div>
      <div className="buttons">
        <button onClick={decrement} className="btn">-</button>
        <button onClick={increment} className="btn">+</button>
      </div>
      <div className="custom-input">
        <input
          type="number"
          value={customValue}
          onChange={handleCustomChange}
          placeholder="Enter custom value"
        />
        <button onClick={setCustomCount} className="btn">Set</button>
      </div>
    </div>
  );
};

export default Counter;
