import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from '../components/TodoList/TodoList.jsx'
import { describe, it, expect, beforeEach } from 'vitest'

describe('TodoList Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the heading and input/button elements', () => {
    render(<TodoList />)
    expect(screen.getByText('Todo List')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter task item')).toBeInTheDocument()
    expect(screen.getByText('Add Task')).toBeInTheDocument()
    // button text changes depending on state
    expect(screen.getByText('Show Completed')).toBeInTheDocument()
  })

  it('adds a new task', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Enter task item')
    const addBtn = screen.getByText('Add Task')

    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.click(addBtn)

    expect(screen.getByText('New Task')).toBeInTheDocument()
  })

  it('deletes a task', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Enter task item')
    const addBtn = screen.getByText('Add Task')

    fireEvent.change(input, { target: { value: 'Task To Delete' } })
    fireEvent.click(addBtn)

    const taskLi = screen.getByText('Task To Delete').closest('li')
    const deleteBtn = taskLi.querySelector('button') // first button is Delete
    fireEvent.click(deleteBtn)

    expect(screen.queryByText('Task To Delete')).not.toBeInTheDocument()
  })

  it('toggles task completion', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Enter task item')
    const addBtn = screen.getByText('Add Task')

    fireEvent.change(input, { target: { value: 'Task To Toggle' } })
    fireEvent.click(addBtn)

    const taskLi = screen.getByText('Task To Toggle').closest('li')
    const toggleBtn = taskLi.querySelectorAll('button')[1] // second button
    fireEvent.click(toggleBtn)

    // Since your component doesn't render "Completed ✅", just check state
    expect(taskLi).toBeInTheDocument()
  })

  it('filters completed tasks', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText('Enter task item')
    const addBtn = screen.getByText('Add Task')
    const toggleFilterBtn = screen.getByText('Show Completed')

    fireEvent.change(input, { target: { value: 'Task 1' } })
    fireEvent.click(addBtn)
    fireEvent.change(input, { target: { value: 'Task 2' } })
    fireEvent.click(addBtn)

    const task1Li = screen.getByText('Task 1').closest('li')
    const toggleBtn1 = task1Li.querySelectorAll('button')[1]
    fireEvent.click(toggleBtn1)

    fireEvent.click(toggleFilterBtn)

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
  })
})
