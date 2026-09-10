import React, { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Alert, Badge } from "react-bootstrap";
import api from "../utils/api";

const ACTION_LABELS = {
  status_update: "updated status of",
  soft_delete: "deleted",
  portfolio_create: "added",
  portfolio_update: "edited",
  portfolio_delete: "removed",
};

const AdminAuditLog = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await api.get("/audit", { params: { limit: 10 } });
        setEntries(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching audit log:", err);
        setError("Failed to load recent activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, []);

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="fw-bold text-primary fs-4 mb-3">
          🕓 Recent Activity
        </Card.Title>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" className="text-primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : entries.length === 0 ? (
          <p className="text-muted">No activity recorded yet.</p>
        ) : (
          <ListGroup variant="flush">
            {entries.map((entry) => (
              <ListGroup.Item key={entry._id} className="d-flex justify-content-between align-items-center">
                <span>
                  <strong>{entry.adminId?.email || "Unknown admin"}</strong>{" "}
                  {ACTION_LABELS[entry.action] || entry.action}{" "}
                  <Badge bg="secondary">{entry.resource}</Badge>
                </span>
                <small className="text-muted">
                  {new Date(entry.timestamp).toLocaleString()}
                </small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdminAuditLog;
