import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./WhatWeOffer.css";
import { useEffect } from "react";

const icons = {
  brush: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l6 6-8.5 8.5a3 3 0 0 1-1.7.85l-3.3.5.5-3.3a3 3 0 0 1 .85-1.7L14 4Z" />
      <path d="M13 5l6 6" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c3 2 4.5 5.5 4.5 9 0 2-.6 3.7-1.5 5l-3-1-3 1c-.9-1.3-1.5-3-1.5-5 0-3.5 1.5-7 4.5-9Z" />
      <circle cx="12" cy="9.5" r="1.5" />
      <path d="M9 16l-2 4M15 16l2 4" />
    </svg>
  ),
};

function WhatWeOffer() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const values = [
    {
      icon: "brush",
      title: "Logo & Visual Identity",
      text: "We design professional logos, color palettes, and brand elements that capture your unique personality and values.",
      delay: "0",
    },
    {
      icon: "target",
      title: "Brand Strategy",
      text: "We help you define your purpose, audience, and positioning to ensure your brand communicates clearly and consistently.",
      delay: "200",
    },
    {
      icon: "monitor",
      title: "Digital Presence",
      text: "From website design to social media branding, we create cohesive visuals that strengthen your online presence.",
      delay: "400",
    },
    {
      icon: "rocket",
      title: "Rebranding & Consultation",
      text: "We refresh outdated brands, modernize visuals, and align your identity with your current goals and audience.",
      delay: "600",
    },
  ];

  return (
    <Container fluid className="py-5">
      <Row className="align-items-center justify-content-center g-4 mx-auto">
        <Col lg={4} md={12}>
          <h2 className="fw-bold h1 orange mb-3" data-aos="fade-right">
            What We Offer
          </h2>
          <p data-aos="fade-right" data-aos-delay="200">
            At <strong>SmediaTek Solutions</strong>, we specialize in helping businesses and individuals 
            craft a strong and memorable brand identity. From strategy and design to execution, 
            we ensure every visual element communicates your story effectively. Our goal is to help you 
            stand out, connect with your audience, and build a brand that inspires trust, loyalty, 
            and recognition. Whether you’re launching a new venture or rebranding an existing one, 
            our creative team delivers solutions that elevate your brand and make a lasting impression.
          </p>
          <Button className="values-button mb-5" href="/Contact">
            Start Your Brand Journey <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </Col>
        <Col lg={7} md={12}>
          <Row className="g-4">
            {values.map((val, index) => (
              <Col sm={12} md={6} key={index} data-aos="fade-up" data-aos-delay={val.delay}>
                <Card className="value-card glass-card text-center h-100 p-2">
                  <Card.Body>
                    <div className="value-icon mb-3">{icons[val.icon]}</div>
                    <Card.Title className="fw-bold fs-5">{val.title}</Card.Title>
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

export default WhatWeOffer;
