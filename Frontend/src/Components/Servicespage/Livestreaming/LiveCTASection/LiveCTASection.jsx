import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import "./LiveCTASection.css";

function LiveCTASection() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    eventType: "",
    services: [],
    details: "",
  });
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://smediatek-solutions.onrender.com/api/livestream", formData);
      setAlert({
        show: true,
        variant: "success",
        message: "✅ Livestream request submitted!",
      });
      setFormData({
        fullName: "",
        organization: "",
        email: "",
        eventType: "",
        services: [],
        details: "",
      });
      setShow(false);
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        variant: "danger",
        message: "❌ Failed to send request.",
      });
    }

    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 4000);
  };

  return (
    <Container fluid className="pb-5 position-relative">
      {alert.show && (
        <Alert
          variant={alert.variant}
          className="position-fixed top-0 start-50 translate-middle-x mt-3 text-center shadow"
          style={{ zIndex: 2000, width: "400px" }}
        >
          {alert.message}
        </Alert>
      )}

      <Row className="cta-section text-center mx-auto w-lg-75">
        <Col>
          <h2 className="h1 orange fw-bold" data-aos="fade-up">
            Ready to Livestream Your Event Professionally?
          </h2>
          <p
            className="mb-5 mt-3 w-75 mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Whether it’s a wedding, concert, or corporate event — SmediaTek
            Solutions ensures your livestream runs smoothly in HD.
          </p>
          <Button
            className="cta-btn"
            onClick={handleShow}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Book Livestream Service
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book a Livestream Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Organization / Event Name</Form.Label>
              <Form.Control
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Type</Form.Label>
              <Form.Select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option>Wedding / Celebration</option>
                <option>Corporate Event</option>
                <option>Concert / Show</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Livestream Services Needed</Form.Label>
              {[
                "Multi-camera livestream",
                "HD video recording",
                "Social media broadcast",
                "Branding overlays",
                "Post-event editing",
              ].map((s) => (
                <Form.Check
                  key={s}
                  type="checkbox"
                  label={s}
                  value={s}
                  checked={formData.services.includes(s)}
                  onChange={handleChange}
                  required={formData.services.length === 0}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit Request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default LiveCTASection;
