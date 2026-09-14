import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CoreValues.css";
import { useEffect } from "react";

const icons = {
  creativity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.35.8.9.8 1.5V16h5.4v-.6c0-.6.3-1.15.8-1.5A6 6 0 0 0 12 3Z" />
      <path d="M10 21h4" />
      <path d="M9 18h6" />
    </svg>
  ),
  impact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </svg>
  ),
};

function CoreValues() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const values = [
    {
      icon: "creativity",
      title: "Creativity",
      text: "We're all about fresh ideas and creative solutions. We're not afraid to think outside the box to help you stand out from the crowd.",
      delay: "0",
    },
    {
      icon: "integrity",
      title: "Integrity",
      text: "We're a team of our word. We believe in honesty, transparency, and accountability, and we're committed to delivering on our promises.",
      delay: "200",
    },
    {
      icon: "innovation",
      title: "Innovation",
      text: "We're always on the lookout for the latest and greatest in tech. We're passionate about using innovative solutions to help you stay ahead of the curve.",
      delay: "400",
    },
    {
      icon: "impact",
      title: "Impact",
      text: "We're not just about creating great work we're about making a difference. We're passionate about empowering people and businesses to thrive in the digital world.",
      delay: "600",
    },
  ];

  return (
    <Container fluid className="py-5">
      <Row className="align-items-center justify-content-center g-4 mx-auto">
        <Col lg={4} md={12}>
          <h2 className="fw-bold h1 orange mb-3" data-aos="fade-right">
            Core Values
          </h2>
          <p data-aos="fade-right" data-aos-delay="200">
            Our values are the heart of everything we do. We're a team of
            creative thinkers, innovators, and problem-solvers who are
            passionate about making a difference. We believe in the power of
            collaboration and are committed to building lasting partnerships
            with our clients. By combining our expertise in tech, design, and
            storytelling, we help you connect with your audience, grow your
            business, and make a meaningful impact.
          </p>
          <Button data-aos="fade-up" className="values-button mb-5">
            Get in touch <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </Col>
        <Col lg={7} md={12}>
          <Row className="g-4">
            {values.map((val, index) => (
              <Col sm={12} md={6} key={index} data-aos="fade-up" data-aos-delay={val.delay}>
                <Card className="value-card glass-card text-center h-100 p-2">
                  <Card.Body>
                    <div className="value-icon mb-3">{icons[val.icon]}</div>
                    <Card.Title className="fw-bold fs-4">{val.title}</Card.Title>
                    <Card.Text>{val.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>        
      </Row>
    </Container>
  );
}

export default CoreValues;
