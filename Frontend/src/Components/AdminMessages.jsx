import React, { useEffect, useState } from "react";
import { Spinner, Alert, Table, Button, Card, Row, Col, Toast, ToastContainer, Form } from "react-bootstrap";
import usePaginatedResource from "../hooks/usePaginatedResource";
import useLeadSocket from "../hooks/useLeadSocket";
import api from "../utils/api";

const RESOURCE_LABELS = {
  contact: "contact message",
  brand: "brand identity request",
  livestream: "livestream request",
  training: "training enrollment",
};

const STATUS_OPTIONS = {
  contact: ["new", "read", "archived"],
  brand: ["new", "in-progress", "won", "lost"],
  livestream: ["new", "in-progress", "won", "lost"],
  training: ["pending", "confirmed", "completed"],
};

// Debounces the search box so it doesn't refetch on every keystroke.
const useDebouncedValue = (value, delayMs) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
};

const SearchAndFilter = ({ resourceKey, resource }) => {
  const [searchInput, setSearchInput] = useState(resource.search);
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  useEffect(() => {
    resource.setSearch(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Row className="g-2 mb-3">
      <Col sm={8} md={9}>
        <Form.Control
          size="sm"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Col>
      <Col sm={4} md={3}>
        <Form.Select
          size="sm"
          value={resource.status}
          onChange={(e) => resource.setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS[resourceKey].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

const StatusSelect = ({ resourceKey, resource, item }) => {
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSaving(true);
    try {
      await resource.updateStatus(item._id, newStatus);
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form.Select
      size="sm"
      value={item.status}
      disabled={saving}
      onChange={handleStatusChange}
      style={{ minWidth: 120, display: "inline-block", width: "auto" }}
    >
      {STATUS_OPTIONS[resourceKey].map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </Form.Select>
  );
};

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

const handleExport = async (endpoint) => {
  try {
    const res = await api.get(`${endpoint}/export`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${endpoint.slice(1)}-export.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Failed to export CSV.");
  }
};

const CardTitleWithExport = ({ className, icon, label, isAdmin, endpoint }) => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <Card.Title className={`${className} mb-0`}>
      {icon} {label}
    </Card.Title>
    {isAdmin && (
      <Button size="sm" variant="outline-primary" onClick={() => handleExport(endpoint)}>
        Export CSV
      </Button>
    )}
  </div>
);

const AdminMessages = () => {
  const isAdmin = localStorage.getItem("adminRole") === "admin";
  const contact = usePaginatedResource("/contact");
  const brand = usePaginatedResource("/brand");
  const livestream = usePaginatedResource("/livestream");
  const training = usePaginatedResource("/training");
  const [toastMessage, setToastMessage] = useState("");

  useLeadSocket((resource) => {
    const resourceHooks = { contact, brand, livestream, training };
    resourceHooks[resource]?.refetch();
    setToastMessage(`New ${RESOURCE_LABELS[resource] || resource} received!`);
  });

  return (
    <div className="container py-4">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast onClose={() => setToastMessage("")} show={!!toastMessage} delay={6000} autohide bg="primary">
          <Toast.Header>
            <strong className="me-auto">🔔 New Lead</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <h2 className="fw-bold text-primary mb-4 text-center">
        🧭 Admin Dashboard — Messages Overview
      </h2>

      <Row>
        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <CardTitleWithExport
                className="fw-bold text-primary fs-4"
                icon="📩"
                label="Contact Messages"
                isAdmin={isAdmin}
                endpoint="/contact"
              />
              <SearchAndFilter resourceKey="contact" resource={contact} />
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
                          <th>Status</th>
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
                              {isAdmin ? (
                                <StatusSelect resourceKey="contact" resource={contact} item={msg} />
                              ) : (
                                msg.status
                              )}
                            </td>
                            <td>
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              {isAdmin && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(contact, msg._id)}
                                >
                                  Delete
                                </Button>
                              )}
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
              <CardTitleWithExport
                className="fw-bold text-success fs-4"
                icon="🎨"
                label="Brand Identity Requests"
                isAdmin={isAdmin}
                endpoint="/brand"
              />
              <SearchAndFilter resourceKey="brand" resource={brand} />
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
                          <th>Images</th>
                          <th>Status</th>
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
                            <td>
                              {p.images && p.images.length > 0 ? (
                                <div className="d-flex gap-1">
                                  {p.images.map((url, i) => (
                                    <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                                      <img
                                        src={url}
                                        alt={`Reference ${i + 1}`}
                                        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
                                      />
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td>
                              {isAdmin ? (
                                <StatusSelect resourceKey="brand" resource={brand} item={p} />
                              ) : (
                                p.status
                              )}
                            </td>
                            <td>{new Date(p.date || p.createdAt).toLocaleDateString()}</td>
                            <td>
                              {isAdmin && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(brand, p._id)}
                                >
                                  Delete
                                </Button>
                              )}
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
              <CardTitleWithExport
                className="fw-bold text-info fs-4"
                icon="🎥"
                label="Livestreaming Requests"
                isAdmin={isAdmin}
                endpoint="/livestream"
              />
              <SearchAndFilter resourceKey="livestream" resource={livestream} />
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
                          <th>Status</th>
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
                            <td>
                              {isAdmin ? (
                                <StatusSelect resourceKey="livestream" resource={livestream} item={r} />
                              ) : (
                                r.status
                              )}
                            </td>
                            <td>{new Date(r.date || r.createdAt).toLocaleDateString()}</td>
                            <td>
                              {isAdmin && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(livestream, r._id)}
                                >
                                  Delete
                                </Button>
                              )}
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
              <CardTitleWithExport
                className="fw-bold text-warning fs-4"
                icon="🎓"
                label="Media Training Enrollments"
                isAdmin={isAdmin}
                endpoint="/training"
              />
              <SearchAndFilter resourceKey="training" resource={training} />
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
                          <th>Status</th>
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
                            <td>
                              {isAdmin ? (
                                <StatusSelect resourceKey="training" resource={training} item={t} />
                              ) : (
                                t.status
                              )}
                            </td>
                            <td>{new Date(t.date || t.createdAt).toLocaleDateString()}</td>
                            <td>
                              {isAdmin && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(training, t._id)}
                                >
                                  Delete
                                </Button>
                              )}
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
