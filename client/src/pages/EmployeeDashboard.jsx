import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Show loading spinner
      setError(null); // Clear previous errors
      const token = localStorage.getItem("token");

      // Redirect to login if token is missing
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(
          "http://localhost:5000/api/tasks/filter",
          {
            headers,
            params: { status: statusFilter, project: projectFilter },
          }
        );

        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(
          err.response?.data?.error || "An error occurred while fetching tasks."
        );
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchTasks();
  }, [statusFilter, projectFilter, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 rounded px-4 py-2"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="text"
          placeholder="Filter by project"
          onChange={(e) => setProjectFilter(e.target.value)}
        />
      </div>

      {/* Loading Spinner */}
      {loading && <p className="text-blue-500">Loading tasks...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border border-gray-300 rounded p-4 shadow"
          >
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Status: <span className="font-medium">{task.status}</span>
            </p>
            <p>
              Project: <span className="font-medium">{task.project}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* No Tasks Message */}
      {!loading && tasks.length === 0 && !error && (
        <p className="text-gray-500">No tasks found.</p>
      )}
    </div>
  );
}

export default EmployeeDashboard;
