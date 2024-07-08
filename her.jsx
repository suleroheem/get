// Task.js

import React from 'react';

const Task = ({ task, onToggleDone, onDelete, onEdit }) => {
  const { id, description, isDone } = task;

  const handleToggleDone = () => {
    onToggleDone(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <div className={`task ${isDone ? 'done' : ''}`}>
      <span>{description}</span>
      <div>
        <button onClick={handleToggleDone}>{isDone ? 'Undo' : 'Done'}</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
// ListTask.js

import React from 'react';
import Task from './Task';

const ListTask = ({ tasks, filter, onToggleDone, onDelete, onEdit }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') {
      return task.isDone;
    } else if (filter === 'not') {
      return !task.isDone;
    }
    return true; // show all tasks
  });

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ListTask;


// AddTask.js

import React, { useState } from 'react';

const AddTask = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask(newTask);
    setNewTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
