import React, { useState } from 'react';
import './App.css';
import logo from './Icons/logo.svg';
import square from './Icons/square.svg';
import check from './Icons/check.svg';
import trash from './Icons/trash.svg';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [folders, setFolders] = useState(['All tasks']);
  const [newFolder, setNewFolder] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All tasks');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask, completed: false, folder: selectedFolder }]);
      setNewTask('');
    }
  };

  const markTaskCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const addFolder = () => {
    if (newFolder.trim() !== '') {
      setFolders([...folders, newFolder]);
      setNewFolder('');
    }
  };
  
  const deleteFolder = (index) => {
    const updatedFolders = [...folders];
    updatedFolders.splice(index, 1);
    setFolders(updatedFolders);
  };

  const filterTasksByFolder = (folder) => {
    setSelectedFolder(folder);
  };

  const filteredTasks = selectedFolder === 'All tasks' ? tasks : tasks.filter((task) => task.folder === selectedFolder);

  return (
    <div className="container">
      <div className="sidebar">
        <ul className="folder-list">
          {folders.map((folder, index) => (
            <li key={index}>
              {folder}
              {folder !== 'All tasks' && (
                <button className="delete-button" onClick={() => deleteFolder(index)}>
                  &#x2716;
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="add-folder">
          <input
            type="text"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="Enter folder name"
            className="folder-input"
          />
          <button onClick={addFolder} className="add-folder-button">
            Add
          </button>
        </div>
      </div>
      <div className="main">
        <div className="header">
        <img src={logo} alt="Logo" className="logo" />
          <h1>Todo App</h1>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={`textfield ${tasks.length > 0 ? 'with-tasks' : ''}`}
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>
        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <div className="task-row">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => markTaskCompleted(index)}
                />
                <span className="task-name">{task.title}</span>
                <button className="delete-button" onClick={() => deleteTask(index)}>
                  &#10005;
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;