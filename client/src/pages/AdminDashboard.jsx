import { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "../components/AddTask";

function AdminDashboard() {
  const [timeLogs, setTimeLogs] = useState([]);

  useEffect(() => {
    const fetchTimeLogs = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          "http://localhost:5000/api/timelogs/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTimeLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch time logs:", error);
      }
    };
    fetchTimeLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-6 text-gray-600 font-semibold">
                  Employee
                </th>
                <th className="py-3 px-6 text-gray-600 font-semibold">Task</th>
                <th className="py-3 px-6 text-gray-600 font-semibold">
                  Start Time
                </th>
                <th className="py-3 px-6 text-gray-600 font-semibold">
                  End Time
                </th>
                <th className="py-3 px-6 text-gray-600 font-semibold">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {timeLogs.map((log) => (
                <tr
                  key={log._id}
                  className="border-b hover:bg-gray-50 transition ease-in-out duration-200"
                >
                  <td className="py-3 px-6">{log.employeeId.name}</td>
                  <td className="py-3 px-6">{log.taskId.title}</td>
                  <td className="py-3 px-6">
                    {new Date(log.startTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(log.endTime).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
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

        <div className="mt-6">
          <AddTask />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
