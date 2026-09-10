import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import api from "../utils/api";

const SERIES = [
  { key: "contact", label: "Contact", color: "#0d6efd" },
  { key: "brand", label: "Brand", color: "#198754" },
  { key: "livestream", label: "Livestream", color: "#0dcaf0" },
  { key: "training", label: "Training", color: "#ffc107" },
];

const buildChartData = (months, monthly) =>
  months.map((month) => {
    const row = { month };
    SERIES.forEach(({ key }) => {
      const entry = monthly[key]?.find((m) => m.month === month);
      row[key] = entry ? entry.count : 0;
    });
    return row;
  });

const AdminStatsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/overview");
        setData(buildChartData(res.data.months, res.data.monthly));
      } catch (err) {
        console.error("❌ Error fetching stats overview:", err);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="fw-bold text-primary fs-4 mb-3">
          📈 Leads per Month (last 12 months)
        </Card.Title>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" className="text-primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {SERIES.map(({ key, label, color }) => (
                <Line key={key} type="monotone" dataKey={key} name={label} stroke={color} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdminStatsChart;
