import { useState, useEffect } from "react";
import './style.css'

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div id="task-manager" className="task-manager">
        <div id="task-manager-container">
            <h2 className="task-manager-title">Gerenciador de Tarefas</h2>
            <div className="task-input-container">
                <input
                id="task-input"
                className="task-input"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite uma tarefa"
                maxLength='34'
                />
                <button id="add-task-button" className="add-task-button" onClick={addTask}>
                Adicionar
                </button>
            </div>
            <ul id="task-list" className="task-list">
                {tasks.map((task) => (
                <li
                    key={task.id}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                >
                    <span
                    className="task-text"
                    onClick={() => toggleTaskCompletion(task.id)}
                    >
                    {task.text}
                    </span>
                    <button
                    className="delete-task-button"
                    onClick={() => removeTask(task.id)}
                    >
                    Excluir
                    </button>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default TaskManager;
