import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Spinner, Alert, Table, Button, Card, Row, Col } from "react-bootstrap";

const AdminMessages = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [brandProjects, setBrandProjects] = useState([]);
  const [livestreamRequests, setLivestreamRequests] = useState([]);
  const [trainingEnrollments, setTrainingEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [contactRes, brandRes, liveRes, trainingRes] = await Promise.all([
          api.get("/api/contact"),
          api.get("/api/brand"),
          api.get("/api/livestream"),
          api.get("/api/training"),
        ]);

        setContactMessages(contactRes.data);
        setBrandProjects(brandRes.data);
        setLivestreamRequests(liveRes.data);
        setTrainingEnrollments(trainingRes.data);
      } catch (err) {
        console.error("❌ Error fetching admin data:", err);
        setError("Failed to load some or all data from the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/api/${type}/${id}`);

      if (type === "contact")
        setContactMessages(contactMessages.filter((msg) => msg._id !== id));
      else if (type === "brand")
        setBrandProjects(brandProjects.filter((msg) => msg._id !== id));
      else if (type === "livestream")
        setLivestreamRequests(livestreamRequests.filter((msg) => msg._id !== id));
      else if (type === "training")
        setTrainingEnrollments(trainingEnrollments.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" className="text-primary" />
        <p>Loading messages...</p>
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4 text-center">
        🧭 Admin Dashboard — Messages Overview
      </h2>

      <Row>
        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold text-primary fs-4 mb-3">
                📩 Contact Messages
              </Card.Title>
              {contactMessages.length === 0 ? (
                <p className="text-muted">No contact messages found.</p>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactMessages.map((msg, index) => (
                        <tr key={msg._id}>
                          <td>{index + 1}</td>
                          <td>{msg.name}</td>
                          <td>{msg.email}</td>
                          <td style={{ maxWidth: "300px" }}>{msg.message}</td>
                          <td>
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(msg._id, "contact")}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold text-success fs-4 mb-3">
                🎨 Brand Identity Requests
              </Card.Title>
              {brandProjects.length === 0 ? (
                <p className="text-muted">No brand identity requests found.</p>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Business Name</th>
                        <th>Email</th>
                        <th>Brand Type</th>
                        <th>Services</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brandProjects.map((p, index) => (
                        <tr key={p._id}>
                          <td>{index + 1}</td>
                          <td>{p.fullName}</td>
                          <td>{p.businessName}</td>
                          <td>{p.email}</td>
                          <td>{p.brandType}</td>
                          <td style={{ maxWidth: "200px" }}>{p.services ? p.services.join(", ") : "None"}</td>
                          <td style={{ maxWidth: "300px" }}>{p.description || "—"}</td>
                          <td>{new Date(p.date || p.createdAt).toLocaleDateString()}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(p._id, "brand")}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold text-info fs-4 mb-3">
                🎥 Livestreaming Requests
              </Card.Title>
              {livestreamRequests.length === 0 ? (
                <p className="text-muted">No livestream requests found.</p>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Organization</th>
                        <th>Email</th>
                        <th>Event Type</th>
                        <th>Services</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {livestreamRequests.map((r, index) => (
                        <tr key={r._id}>
                          <td>{index + 1}</td>
                          <td>{r.fullName || r.name || "N/A"}</td>
                          <td>{r.organization || "N/A"}</td>
                          <td>{r.email || "N/A"}</td>
                          <td>{r.eventType || "N/A"}</td>
                          <td style={{ maxWidth: "200px" }}>{r.services ? r.services.join(", ") : "N/A"}</td>
                          <td style={{ maxWidth: "300px" }}>{r.details || "—"}</td>
                          <td>{new Date(r.date || r.createdAt).toLocaleDateString()}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(r._id, "livestream")}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Media Training Enrollments */}
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold text-warning fs-4 mb-3">
                🎓 Media Training Enrollments
              </Card.Title>
              {trainingEnrollments.length === 0 ? (
                <p className="text-muted">No training enrollments found.</p>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Focus</th>
                        <th>Mode</th>
                        <th>Goals</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainingEnrollments.map((t, index) => (
                        <tr key={t._id}>
                          <td>{index + 1}</td>
                          <td>{t.fullName || t.name || "N/A"}</td>
                          <td>{t.email || "N/A"}</td>
                          <td>{t.phone || "N/A"}</td>
                          <td>{t.focus || t.course || "N/A"}</td>
                          <td>{t.mode || "N/A"}</td>
                          <td style={{ maxWidth: "300px" }}>{t.goals || "—"}</td>
                          <td>{new Date(t.date || t.createdAt).toLocaleDateString()}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(t._id, "training")}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMessages;
