import { Container, Row, Col, Button } from "react-bootstrap";

const FeaturedProject = () => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Featured Project"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
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
