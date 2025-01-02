import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [timeLogs, setTimeLogs] = useState([]);

  useEffect(() => {
    const fetchTimeLogs = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/timelogs/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTimeLogs(response.data);
    };
    fetchTimeLogs();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Task</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {timeLogs.map((log) => (
            <tr key={log._id}>
              <td>{log.employeeId.name}</td>
              <td>{log.taskId.title}</td>
              <td>{new Date(log.startTime).toLocaleString()}</td>
              <td>{new Date(log.endTime).toLocaleString()}</td>
              <td>
                {(
                  (new Date(log.endTime) - new Date(log.startTime)) /
                  3600000
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
