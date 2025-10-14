import React from "react";
import styles from "../TodoList/TodoList.module.css";

const TodoItem = ({ item, index, onDelete, onToggle }) => {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <span className={item.isCompleted ? styles.completed : ""}>
          {item.task} {item.category && `(${item.category})`}
        </span>
      </div>
      <button className={styles.deleteBtn} onClick={() => onDelete(index)}>
        Delete
      </button>
      <button className={styles.togglebtn} onClick={() => onToggle(index)}>Toggle Complete</button>
    </li>
  );
};

export default TodoItem;
