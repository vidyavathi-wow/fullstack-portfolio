import { memo, useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import useLocalStorage from "../../Customhooks/UseLocalStorage.js";
import useToggle from "../../Customhooks/useToggle.js";
import TodoItem from "../TodoItem/TodoItem.jsx";

function TodoList() {
  const [items, setItems] = useLocalStorage("todos", []);
  const [taskItem, setTaskItem] = useState({
    id: "",
    task: "",
    category: "",
    isCompleted: false,
  });
  const [showCompleted, toggleShowCompleted] = useToggle(false);
  const [filterCategory, setFilterCategory] = useState("");

  const handleAddTask = () => {
    if (!taskItem.task.trim()) return;
    setItems((prev) => [
      ...prev,
      { ...taskItem, id: prev.length + 1 },
    ]);
    setTaskItem({ id: "", task: "", category: "", isCompleted: false });
  };

  const handleToggle = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, ind) => ind !== index);
    setItems(filteredItems);
  };

  const displayedItems = showCompleted
    ? items.filter((item) => item.isCompleted)
    : items;

  const filteredItems = filterCategory
    ? displayedItems.filter((item) => item.category === filterCategory)
    : displayedItems;

  useEffect(() => {
    const total = items.length;
    const completed = items.filter((item) => item.isCompleted).length;
    const pending = total - completed;

    const categoryCount = items.reduce((acc, curr) => {
      const cat = curr.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const analytics = { total, completed, pending, categoryCount };
    localStorage.setItem("todoAnalytics", JSON.stringify(analytics));
  }, [items]);
   if (taskItem.task === "throw-error") {
      throw new Error("Deliberate error thrown!");
    }

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>


      <div className={styles.form}>
        <input
          type="text"
          value={taskItem.task}
          placeholder="Enter task item"
          onChange={(e) =>
            setTaskItem({ ...taskItem, task: e.target.value })
          }
        />

        <select
          value={taskItem.category}
          onChange={(e) =>
            setTaskItem({ ...taskItem, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={handleAddTask}>Add Task</button>

        <button onClick={toggleShowCompleted}>
          {showCompleted ? "Show All" : "Show Completed"}
        </button>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Filter by Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <ul>
        {filteredItems.map((item, index) => (
          <TodoItem
            key={item.id}
            item={item}
            index={index}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}

export default memo(TodoList);
