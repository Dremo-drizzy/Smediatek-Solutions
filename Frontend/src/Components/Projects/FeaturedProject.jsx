import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedProject = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container>
      <Row className="align-items-center" data-aos="fade-up">
        <Col md={6} data-aos="fade-right">
          <img
            src="https:
            alt="Featured Project"
            className="img-fluid rounded shadow"
          />
        </Col>

        <Col md={6} data-aos="fade-left">
          <h2 className="fw-bold">Featured Project: BOLT Taxi Management</h2>
          <p>
            A comprehensive system for managing drivers, rides, and passengers.
            Includes a secure database schema, real-time tracking, and seamless booking experience.
          </p>
          <Button variant="dark" href="#">
            View Project
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedProject;
