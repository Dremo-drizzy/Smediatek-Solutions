import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CoreValues.css";
import { useEffect } from "react";

function CoreValues() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const values = [
    {
      icon: "🎨",
      title: "Creativity",
      text: "We're all about fresh ideas and creative solutions. We're not afraid to think outside the box to help you stand out from the crowd.",
      delay: "0",
    },
    {
      icon: "🤝",
      title: "Integrity",
      text: "We're a team of our word. We believe in honesty, transparency, and accountability, and we're committed to delivering on our promises.",
      delay: "200",
    },
    {
      icon: "💡",
      title: "Innovation",
      text: "We're always on the lookout for the latest and greatest in tech. We're passionate about using innovative solutions to help you stay ahead of the curve.",
      delay: "400",
    },
    {
      icon: "🌍",
      title: "Impact",
      text: "We're not just about creating great work—we're about making a difference. We're passionate about empowering people and businesses to thrive in the digital world.",
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
                <Card className="value-card text-center h-100 p-2">
                  <Card.Body>
                    <div className="value-icon mb-3">{val.icon}</div>
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
