import React from "react";
import { Spinner, Alert, Table, Button, Card, Row, Col } from "react-bootstrap";
import usePaginatedResource from "../hooks/usePaginatedResource";

const Pager = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <Button
        size="sm"
        variant="outline-secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span className="text-muted">
        Page {page} of {pages}
      </span>
      <Button
        size="sm"
        variant="outline-secondary"
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

const handleDelete = async (resource, id) => {
  if (!window.confirm("Are you sure you want to delete this message?")) return;
  try {
    await resource.remove(id);
  } catch (err) {
    console.error(err);
    alert("Failed to delete message.");
  }
};

const AdminMessages = () => {
  const contact = usePaginatedResource("/contact");
  const brand = usePaginatedResource("/brand");
  const livestream = usePaginatedResource("/livestream");
  const training = usePaginatedResource("/training");

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
              {contact.loading ? (
                <div className="text-center py-3">
                  <Spinner animation="border" className="text-primary" />
                </div>
              ) : contact.error ? (
                <Alert variant="danger">{contact.error}</Alert>
              ) : contact.items.length === 0 ? (
                <p className="text-muted">No contact messages found.</p>
              ) : (
                <>
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
                        {contact.items.map((msg, index) => (
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
                                onClick={() => handleDelete(contact, msg._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pager page={contact.page} pages={contact.pages} onPageChange={contact.setPage} />
                </>
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
              {brand.loading ? (
                <div className="text-center py-3">
                  <Spinner animation="border" className="text-primary" />
                </div>
              ) : brand.error ? (
                <Alert variant="danger">{brand.error}</Alert>
              ) : brand.items.length === 0 ? (
                <p className="text-muted">No brand identity requests found.</p>
              ) : (
                <>
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
                        {brand.items.map((p, index) => (
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
                                onClick={() => handleDelete(brand, p._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pager page={brand.page} pages={brand.pages} onPageChange={brand.setPage} />
                </>
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
              {livestream.loading ? (
                <div className="text-center py-3">
                  <Spinner animation="border" className="text-primary" />
                </div>
              ) : livestream.error ? (
                <Alert variant="danger">{livestream.error}</Alert>
              ) : livestream.items.length === 0 ? (
                <p className="text-muted">No livestream requests found.</p>
              ) : (
                <>
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
                        {livestream.items.map((r, index) => (
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
                                onClick={() => handleDelete(livestream, r._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pager page={livestream.page} pages={livestream.pages} onPageChange={livestream.setPage} />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold text-warning fs-4 mb-3">
                🎓 Media Training Enrollments
              </Card.Title>
              {training.loading ? (
                <div className="text-center py-3">
                  <Spinner animation="border" className="text-primary" />
                </div>
              ) : training.error ? (
                <Alert variant="danger">{training.error}</Alert>
              ) : training.items.length === 0 ? (
                <p className="text-muted">No training enrollments found.</p>
              ) : (
                <>
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
                        {training.items.map((t, index) => (
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
                                onClick={() => handleDelete(training, t._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pager page={training.page} pages={training.pages} onPageChange={training.setPage} />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminMessages;
