import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminReports() {
  const [hoursData, setHoursData] = useState([]);
  const [taskStatusData, setTaskStatusData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const hoursResponse = await axios.get(
        "http://localhost:5000/api/analytics/hours-per-employee",
        { headers }
      );
      const taskStatusResponse = await axios.get(
        "http://localhost:5000/api/analytics/task-status-summary",
        { headers }
      );

      setHoursData(hoursResponse.data);
      setTaskStatusData(taskStatusResponse.data);
    };

    fetchAnalytics();
  }, []);

  const hoursChart = {
    labels: hoursData.map((item) => item.employee),
    datasets: [
      {
        label: "Total Hours Worked",
        data: hoursData.map((item) => item.totalHours),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const taskStatusChart = {
    labels: taskStatusData.map((item) => item._id),
    datasets: [
      {
        label: "Task Status",
        data: taskStatusData.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h2>Admin Reports</h2>
      <div style={{ width: "50%", margin: "auto" }}>
        <h3>Hours Worked Per Employee</h3>
        <Bar data={hoursChart} />
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <h3>Task Status Summary</h3>
        <Pie data={taskStatusChart} />
      </div>
    </div>
  );
}

export default AdminReports;
