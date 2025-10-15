import React from "react";
import Button from "../common/Button/Button.jsx"; // import common button
import styles from "./TodoItem.module.css";

const TodoItem = ({ item, index, onDelete, onToggle, onEdit }) => {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <span className={item.isCompleted ? styles.completed : ""}>
          {item.task} {item.category && `(${item.category})`}
        </span>
      </div>

      <div className={styles.actions}>
        <Button
          onClick={() => onDelete(index)}
          variant="danger"
        >
          Delete
        </Button>

        <Button
          onClick={() => onEdit(index)}
          variant="secondary"
        >
          Edit
        </Button>

        <Button
          onClick={() => onToggle(index)}
          variant="primary"
        >
          {item.isCompleted ? "Undo" : "Mark Complete"}
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
