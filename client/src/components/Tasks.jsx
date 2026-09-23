import { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/tasks/${userId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, [userId]);

  async function handleAddTask(e) {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, text: taskInput }),
      });

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTaskInput("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  }

  async function handleToggleComplete(id, currentStatus) {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  }

  if (!userId) {
    return (
      <div className="container py-5">
        <p>
          Please <a href="/login">Login</a>to view your tasks.
        </p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <h1 className="mb-4">My Tasks</h1>

      <form onSubmit={handleAddTask} className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-item-center"
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!!task.completed}
                onChange={() => handleToggleComplete(task.id, task.completed)}
              />
              <label
                className={`form-check-label ${task.completed ? "text-decoration-line-through text-muted" : ""}`}
              >
                {task.text}
              </label>
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Tasks;
