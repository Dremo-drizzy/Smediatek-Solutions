import { Container, Row, Form, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import "./ContactSection.css";

function ContactSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const res = await api.post("/api/contact", formData);
      setStatus(res.data.message || "✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="py-5" data-aos="fade-up">
      <Row
        className="text-center justify-content-center mb-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 className="fw-bold h1 orange mb-3">Get In Touch</h2>
        <p className="text-muted w-75 mx-auto">
          We’d love to hear from you! Whether you have a question about our
          media services, training programs, or partnership opportunities — our
          team is ready to assist.
        </p>
      </Row>

      <Row
        className="justify-content-center g-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          className="text-center mb-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          
          <p><strong>📞 Phone:</strong> +2349011952759</p>
          <p><strong>📧 Email:</strong> smediateksolutions@gmail.com</p>
          <p><strong>🕒 Hours:</strong> Mon – Fri: 9 AM – 6 PM</p>
        </div>

        <div
          className="contact p-4 rounded w-75 mx-auto shadow-lg bg-light"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h4 className="fw-bold mb-4 orange text-center">Send Us a Message</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              size="lg" 
              type="submit" 
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Form>

          {status && (
            <p className={`text-center mt-3 fw-semibold ${status.includes('❌') ? 'text-danger' : 'text-success'}`}>
              {status}
            </p>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default ContactSection;
