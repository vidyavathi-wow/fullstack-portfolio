import { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import styles from './TodoList.module.css';
import TodoItem from '../TodoItem/TodoItem.jsx';
import EmptyState from '../EmptyState.jsx';
import Button from '../common/Button/Button.jsx';
import Dropdown from '../common/Dropdown/Dropdown.jsx';
import Input from '../common/Input/Input.jsx';
import {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  setTasks,
} from '../../redux/features/todosSlice';

function TodoList() {
  const items = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const [taskItem, setTaskItem] = useState({
    id: '',
    task: '',
    category: '',
    isCompleted: false,
  });
  const [showCompleted, setShowCompleted] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load tasks from localStorage into Redux once
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (storedTodos.length > 0) {
      dispatch(setTasks(storedTodos));
    }
  }, [dispatch]);

  // Sync Redux store to localStorage and analytics
  useEffect(() => {
    // Always update localStorage, even if empty
    localStorage.setItem('todos', JSON.stringify(items));

    const total = items.length;
    const completed = items.filter((item) => item.isCompleted).length;
    const pending = total - completed;
    const categoryCount = items.reduce((acc, curr) => {
      const cat = curr.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    localStorage.setItem(
      'todoAnalytics',
      JSON.stringify({ total, completed, pending, categoryCount })
    );
  }, [items]);

  const handleResetFilter = () => {
    setFilterCategory('');
    setShowCompleted(false);
  };

  const handleAddTask = () => {
    const taskText = taskItem.task.trim();
    if (!taskText) return toast.error('Task cannot be empty');
    if (!taskItem.category) return toast.error('Please select a category');

    if (isEditing) {
      dispatch(editTask(taskItem));
      toast.success(`Task "${taskItem.task}" updated`);
      setIsEditing(false);
    } else {
      dispatch(addTask(taskItem));
      toast.success(`Task "${taskItem.task}" added`);
    }

    setTaskItem({ id: '', task: '', category: '', isCompleted: false });
  };

  // When filtered view is active, get the actual index in the items array
  const getItemIndex = (filteredIndex) => {
    const displayedItems = showCompleted
      ? items.filter((item) => item.isCompleted)
      : items;
    const filteredItems = filterCategory
      ? displayedItems.filter((item) => item.category === filterCategory)
      : displayedItems;
    return items.findIndex((i) => i.id === filteredItems[filteredIndex].id);
  };

  const handleEdit = (filteredIndex) => {
    const index = getItemIndex(filteredIndex);
    setTaskItem(items[index]);
    setIsEditing(true);
  };

  const handleToggle = (filteredIndex) => {
    const index = getItemIndex(filteredIndex);
    dispatch(toggleTask(index));
    const action = items[index].isCompleted ? 'marked incomplete' : 'completed';
    toast.success(`Task "${items[index].task}" ${action}`);
  };

  const handleDelete = (filteredIndex) => {
    const index = getItemIndex(filteredIndex);
    const taskName = items[index].task;
    dispatch(deleteTask(index));
    toast.error(`Task "${taskName}" deleted`);
  };

  const displayedItems = showCompleted
    ? items.filter((item) => item.isCompleted)
    : items;
  const filteredItems = filterCategory
    ? displayedItems.filter((item) => item.category === filterCategory)
    : displayedItems;

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>

      <div className={styles.form}>
        <div className={styles.addfields}>
          <Input
            type="text"
            value={taskItem.task}
            placeholder="Enter task item"
            onChange={(val) => setTaskItem({ ...taskItem, task: val })}
          />
          <Button onClick={handleAddTask} variant="primary">
            {isEditing ? 'Update Task' : 'Add Task'}
          </Button>
          <Dropdown
            options={['Work', 'Personal', 'Study', 'Other']}
            value={taskItem.category}
            onChange={(val) => setTaskItem({ ...taskItem, category: val })}
            placeholder="Select Category"
          />
        </div>

        <div className={styles.filters}>
          <Button
            onClick={() => setShowCompleted((prev) => !prev)}
            variant="secondary"
          >
            {showCompleted ? 'Show All' : 'Completed'}
          </Button>

          <Dropdown
            options={['Work', 'Personal', 'Study', 'Other']}
            value={filterCategory}
            onChange={setFilterCategory}
            placeholder="Filter by Category"
          />

          <Button
            onClick={handleResetFilter}
            variant="danger"
            disabled={!filterCategory && !showCompleted}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <ul>
        {filteredItems.length === 0 ? (
          <EmptyState message="No tasks found" />
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
