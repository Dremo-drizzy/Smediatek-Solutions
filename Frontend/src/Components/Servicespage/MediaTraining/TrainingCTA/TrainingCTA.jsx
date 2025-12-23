import { Container, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./TrainingCTA.css";

function TrainingCTA() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    focus: "",
    mode: "",
    goals: "",
  });
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("https://smediatek-solutions.onrender.com/api/training", formData);
      setAlert({ show: true, variant: "success", message: "✅ Enrollment submitted successfully!" });
      setFormData({ fullName: "", email: "", phone: "", focus: "", mode: "", goals: "" });
      setShow(false);
    } catch (error) {
      console.error(error);
      setAlert({ show: true, variant: "danger", message: "❌ Submission failed. Try again." });
    }finally {
      setIsSubmitting(false);
    }
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 4000);
  };

  return (
    <Container fluid className="pb-5">
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
            Ready to Become a Media Professional?
          </h2>
          <p className="mb-5 mt-3 w-75 mx-auto" data-aos="fade-up" data-aos-delay="100">
            Join our hands-on media training program and gain real-world experience in livestreaming, editing, and storytelling.
          </p>
          <Button className="cta-btn" onClick={handleShow} data-aos="zoom-in" data-aos-delay="300">
            Enroll in Media Training
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Media Training Enrollment Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="fullName" value={formData.fullName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Training Focus</Form.Label>
              <Form.Select name="focus" value={formData.focus} onChange={handleChange} required>
                <option value="">Select...</option>
                <option>Livestream Production</option>
                <option>Video Editing</option>
                <option>Media Directing</option>
                <option>Full Media Package</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Mode</Form.Label>
              <Form.Check type="radio" name="mode" label="In-person" value="onsite" onChange={handleChange} required />
              <Form.Check type="radio" name="mode" label="Online" value="online" onChange={handleChange} required />
              <Form.Check type="radio" name="mode" label="Hybrid" value="hybrid" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tell Us Your Media Goals</Form.Label>
              <Form.Control as="textarea" rows={3} name="goals" value={formData.goals} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {isSubmitting ? "Sending..." : "Submit Enrollment"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TrainingCTA;
