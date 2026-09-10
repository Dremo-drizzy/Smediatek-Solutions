import React, { useEffect, useState } from "react";
import { Card, Table, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import api from "../utils/api";

const emptyForm = { title: "", category: "", imageUrl: "", description: "", order: 0 };

const AdminPortfolioPanel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newForm, setNewForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/portfolio");
      setItems(res.data);
    } catch (err) {
      console.error("❌ Error fetching portfolio:", err);
      setError("Failed to load portfolio items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post("/portfolio", { ...newForm, order: Number(newForm.order) || 0 });
      setNewForm(emptyForm);
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert("Failed to add portfolio item.");
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description || "",
      order: item.order,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(emptyForm);
  };

  const saveEdit = async (id) => {
    try {
      await api.patch(`/portfolio/${id}`, { ...editForm, order: Number(editForm.order) || 0 });
      cancelEdit();
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert("Failed to update portfolio item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;
    try {
      await api.delete(`/portfolio/${id}`);
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert("Failed to delete portfolio item.");
    }
  };

  const move = async (index, direction) => {
    const target = items[index];
    const neighbor = items[index + direction];
    if (!target || !neighbor) return;

    try {
      await Promise.all([
        api.patch(`/portfolio/${target._id}`, { order: neighbor.order }),
        api.patch(`/portfolio/${neighbor._id}`, { order: target.order }),
      ]);
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert("Failed to reorder portfolio items.");
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="fw-bold text-primary fs-4 mb-3">
          🖼️ Manage Portfolio
        </Card.Title>

        <Form onSubmit={handleCreate} className="mb-4">
          <Row className="g-2 align-items-end">
            <Col md={2}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                size="sm"
                value={newForm.title}
                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                required
              />
            </Col>
            <Col md={2}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                size="sm"
                value={newForm.category}
                onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                size="sm"
                value={newForm.imageUrl}
                onChange={(e) => setNewForm({ ...newForm, imageUrl: e.target.value })}
                placeholder="/portfolio/Category/file.jpg"
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                size="sm"
                value={newForm.description}
                onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
              />
            </Col>
            <Col md={1}>
              <Form.Label>Order</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                value={newForm.order}
                onChange={(e) => setNewForm({ ...newForm, order: e.target.value })}
              />
            </Col>
            <Col md={1}>
              <Button size="sm" variant="primary" type="submit" disabled={creating} className="w-100">
                {creating ? "Adding..." : "Add"}
              </Button>
            </Col>
          </Row>
        </Form>

        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" className="text-primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : items.length === 0 ? (
          <p className="text-muted">No portfolio items yet.</p>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover size="sm">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Image URL</th>
                  <th>Description</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id}>
                    {editingId === item._id ? (
                      <>
                        <td>{index + 1}</td>
                        <td>
                          <Form.Control
                            size="sm"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            value={editForm.imageUrl}
                            onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="number"
                            value={editForm.order}
                            onChange={(e) => setEditForm({ ...editForm, order: e.target.value })}
                          />
                        </td>
                        <td className="text-nowrap">
                          <Button size="sm" variant="success" className="me-1" onClick={() => saveEdit(item._id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="secondary" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.imageUrl}
                        </td>
                        <td>{item.description || "—"}</td>
                        <td>{item.order}</td>
                        <td className="text-nowrap">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            className="me-1"
                            disabled={index === 0}
                            onClick={() => move(index, -1)}
                          >
                            ↑
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            className="me-1"
                            disabled={index === items.length - 1}
                            onClick={() => move(index, 1)}
                          >
                            ↓
                          </Button>
                          <Button size="sm" variant="primary" className="me-1" onClick={() => startEdit(item)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(item._id)}>
                            Delete
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdminPortfolioPanel;
