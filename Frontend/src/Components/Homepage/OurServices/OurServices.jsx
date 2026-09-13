import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./OurServices.css";

const icons = {
  broadcast: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.5 5.5a9 9 0 0 0 0 13" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.6-.7 1.6-1.5 0-.4-.16-.75-.4-1.02-.24-.28-.4-.63-.4-1.03 0-.83.67-1.45 1.5-1.45H16a4 4 0 0 0 4-4c0-5-3.6-9-8-9Z" />
      <circle cx="7.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
      <path d="M8.5 21h7" />
    </svg>
  ),
};

function OurServices() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const services = [
    {
      title: "Livestreaming",
      subtitle: "Share your story with the world in stunning HD. We offer professional live streaming services for any event, anytime, anywhere.",
      link: "/Livestreaming",
      icon: "broadcast",
      delay: "0",
    },
    {
      title: "Brand Identity",
      subtitle: "Your brand is your story. We'll help you tell it with a powerful and unforgettable identity that captures attention and builds loyalty.",
      link: "/BrandIdentityPage",
      icon: "palette",
      delay: "150",
    },
    {
      title: "Media Training",
      subtitle: "Master the media with our expert-led training. We'll equip you with the skills and confidence to shine in front of the camera and behind the mic.",
      link: "/MediaTraining",
      icon: "mic",
      delay: "300",
    },
  ];

  return (
    <Container fluid className="py-5" data-aos="fade-up">
      <div className="text-center mb-5" data-aos="fade-up" data-aos-delay="100">
        <h2 className="orange h1 fw-bold">Our Services</h2>
        <p>We deliver top-quality creative and digital media solutions.</p>
      </div>

      <Row className="g-4 mx-auto justify-content-center services-grid">
        {services.map((service) => (
          <Col md={4} sm={6} xs={12} key={service.title} data-aos="fade-up" data-aos-delay={service.delay}>
            <Card className="service-card glass-card h-100 border-0">
              <Card.Body className="p-4 text-center">
                <div className="service-icon">{icons[service.icon]}</div>
                <Card.Title className="fw-bold">{service.title}</Card.Title>
                <Card.Text>{service.subtitle}</Card.Text>
                <Link className="link" to={service.link}>
                  See more <i className="bi bi-arrow-right"></i>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OurServices;
