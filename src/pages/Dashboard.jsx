import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useEffect, useState } from "react";

function Dashboard() {

  const [questions, setQuestions] = useState([]);

  // Get data from localStorage (same as Problems page)
  useEffect(() => {
    const stored = localStorage.getItem("questions");
    if (stored) {
      setQuestions(JSON.parse(stored));
    }
  }, []);

  const solved = questions.filter(q => q.solved).length;
  const unsolved = questions.length - solved;

  const easySolved = questions.filter(q => q.difficulty === "Easy" && q.solved).length;
  const mediumSolved = questions.filter(q => q.difficulty === "Medium" && q.solved).length;
  const hardSolved = questions.filter(q => q.difficulty === "Hard" && q.solved).length;

  const pieData = [
    { name: "Solved", value: solved },
    { name: "Unsolved", value: unsolved }
  ];

  const barData = [
    { name: "Easy", solved: easySolved },
    { name: "Medium", solved: mediumSolved },
    { name: "Hard", solved: hardSolved }
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div style={{ padding: "40px" }}>

      {/* NAVBAR */}
      <nav style={{ marginBottom: "20px" }}>
        <a href="/" style={{ marginRight: "15px", fontWeight: "bold" }}>
          Problems
        </a>

        <a href="/dashboard" style={{ fontWeight: "bold", color: "#FF9800" }}>
          Dashboard
        </a>
      </nav>

      <h1>Dashboard Analytics 📊</h1>

      {/* PIE CHART */}
      <h3>Solved vs Unsolved</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={100}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* BAR CHART */}
      <h3>Difficulty Breakdown</h3>

      <BarChart
        width={500}
        height={300}
        data={barData}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="solved" fill="#2196F3" />
      </BarChart>

    </div>
  );
}

export default Dashboard;