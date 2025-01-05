import { useState, useEffect } from "react";
import axios from "axios";

function AddTask() {
  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: "",
    employeeId: "",
  });
  const [employees, setEmployees] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get user details from localStorage
  console.log("user:", user.role);
  const token = localStorage.getItem("token"); // Get JWT token from localStorage
  console.log("user token:", token);

  useEffect(() => {
    // If user is an admin, fetch employees
    if (user.role === "admin") {
      const fetchEmployees = async (token) => {
        try {
          !token
            ? console.log("no token")
            : console.log(" token is here", token);

          const { data } = await axios.get(
            "http://localhost:5000/api/employees",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setEmployees(data);
          console.log("all employees:", employees);
        } catch (err) {
          if (err.response) {
            console.error(
              "Error fetching employees:",
              err.response.status,
              err.response.data
            );
          } else {
            console.error("Error fetching employees:", err.message);
          }
        }
      };
      fetchEmployees(token);
    }
  }, [token, user.role]);
  //on task submission creating new task
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      name: task.name,
      description: task.description,
      deadline: task.deadline,
      employeeId: user.role === "admin" ? task.employeeId : user.id, // Map 'employeeId' to 'assignedTo'
    };

    console.log("Task data being submitted:", taskData);

    try {
      await axios.post("http://localhost:5000/api/tasks", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task created successfully!");
      setTask({ name: "", description: "", deadline: "", employeeId: "" });
    } catch (err) {
      if (err.response) {
        console.error("Failed to create task:", err.response.data);
        alert(err.response?.data?.error || "An error occurred");
      } else {
        console.error("Network error:", err.message);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {user.role === "admin"
          ? "Assign Task to Employee"
          : "Create a New Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Task Name
          </label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {user.role === "admin" && (
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Assign to Employee
            </label>
            <select
              name="employeeId"
              value={task.employeeId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
