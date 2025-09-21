import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data dummy untuk card statistik
const statsData = [
  { title: "Total Users", value: 1200, change: "+8%", color: "bg-blue-100" },
  { title: "Orders", value: 320, change: "+12%", color: "bg-green-100" },
  { title: "Revenue", value: "$12,400", change: "+5%", color: "bg-yellow-100" },
];

// Data dummy untuk chart (monthly sales)
const chartData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
  { month: "Apr", sales: 700 },
  { month: "May", sales: 600 },
  { month: "Jun", sales: 800 },
  { month: "Jul", sales: 750 },
];

export default function Dashboard() {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          sales: d.sales + Math.floor(Math.random() * 50 - 25),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Wrapper utama */}
      <div className="space-y-6 bg-gray-50 rounded-lg p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-sm mb-4">
          Dashboard Admin
        </h1>

        {/* Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.title}
              className={`${stat.color} shadow rounded-lg p-6 transform transition hover:scale-105 hover:shadow-lg`}
            >
              <h2 className="text-gray-700 text-sm">{stat.title}</h2>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <span
                className={`text-sm mt-1 inline-block ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} vs last month
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-gray-50 shadow rounded-lg p-6">
          <h2 className="text-gray-700 font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
