import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./WhatWeOffer.css";
import { useEffect } from "react";

function WhatWeOffer() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const values = [
    {
      icon: "🎨",
      title: "Logo & Visual Identity",
      text: "We design professional logos, color palettes, and brand elements that capture your unique personality and values.",
      delay: "0",
    },
    {
      icon: "📊",
      title: "Brand Strategy",
      text: "We help you define your purpose, audience, and positioning to ensure your brand communicates clearly and consistently.",
      delay: "200",
    },
    {
      icon: "💻",
      title: "Digital Presence",
      text: "From website design to social media branding, we create cohesive visuals that strengthen your online presence.",
      delay: "400",
    },
    {
      icon: "🚀",
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
                <Card className="value-card text-center h-100 p-2">
                  <Card.Body>
                    <div className="value-icon mb-3">{val.icon}</div>
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
