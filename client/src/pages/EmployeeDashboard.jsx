import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        "http://localhost:5000/api/tasks/filter",
        {
          headers,
          params: { status: statusFilter, project: projectFilter },
        }
      );

      setTasks(response.data);
    };

    fetchTasks();
  }, [statusFilter, projectFilter]);

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="text"
          placeholder="Filter by project"
          onChange={(e) => setProjectFilter(e.target.value)}
        />
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Project: {task.project}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDashboard;
