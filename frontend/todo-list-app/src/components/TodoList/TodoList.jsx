import { memo, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './TodoList.module.css';
import useLocalStorage from '../../customhooks/UseLocalStorage.js';
import useToggle from '../../customhooks/useToggle.js';
import TodoItem from '../TodoItem/TodoItem.jsx';
import EmptyState from '../EmptyState.jsx';
import Button from '../common/Button/Button.jsx';
import Dropdown from '../common/Dropdown/Dropdown.jsx';
import Input from '../common/Input/Input.jsx';

function TodoList() {
  const [items, setItems] = useLocalStorage('todos', []);
  const [taskItem, setTaskItem] = useState({
    id: '',
    task: '',
    category: '',
    isCompleted: false,
  });
  const [showCompleted, toggleShowCompleted] = useToggle(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = () => {
    if (!taskItem.task.trim()) return;

    if (isEditing) {
      const updatedItems = items.map((item) =>
        item.id === taskItem.id ? { ...taskItem } : item
      );
      setItems(updatedItems);
      toast.success(`Task "${taskItem.task}" updated`);
      setIsEditing(false);
    } else {
      setItems((prev) => [...prev, { ...taskItem, id: prev.length + 1 }]);
      toast.success(`Task "${taskItem.task}" added`);
    }

    setTaskItem({ id: '', task: '', category: '', isCompleted: false });
  };

  const handleEdit = (index) => {
    const item = items[index];
    setTaskItem(item);
    setIsEditing(true);
  };

  const handleToggle = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setItems(updatedItems);

    const action = updatedItems[index].isCompleted
      ? 'completed'
      : 'marked incomplete';
    toast.success(`Task "${updatedItems[index].task}" ${action}`);
  };

  const handleDelete = (index) => {
    const taskName = items[index].task;
    const filteredItems = items.filter((_, ind) => ind !== index);
    setItems(filteredItems);

    toast.error(`Task "${taskName}" deleted`);
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
      const cat = curr.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const analytics = { total, completed, pending, categoryCount };
    localStorage.setItem('todoAnalytics', JSON.stringify(analytics));
  }, [items]);

  if (taskItem.task === 'throw-error') {
    throw new Error('Deliberate error thrown!');
  }

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>

      <div className={styles.form}>
        <div className={styles.addfields}>
       <Input
  type="text"
  value={taskItem.task}
  placeholder="Enter task item"
  onChange={(val) => setTaskItem({ ...taskItem, task:val })}
/>


        <Dropdown
          options={['Work', 'Personal', 'Study', 'Other']}
          value={taskItem.category}
          onChange={(val) => setTaskItem({ ...taskItem, category: val })}
          placeholder="Select Category"
        />

        <Button onClick={handleAddTask} variant="primary">
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>

        </div>

        <div className={styles.filters}>
          <Button onClick={toggleShowCompleted} variant="secondary">
            {showCompleted ? 'Show All' : 'Show Completed'}
          </Button>

          <Dropdown
            options={['Work', 'Personal', 'Study', 'Other']}
            value={filterCategory}
            onChange={setFilterCategory}
            placeholder="Filter by Category"
          />
        </div>
      </div>

      <ul>
        {filteredItems.length === 0 ? (
          <EmptyState message="No tasks found. Add a new one!" />
        ) : (
          filteredItems.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              index={index}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default memo(TodoList);
