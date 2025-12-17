import { Container, Row, Col } from "react-bootstrap";

function AboutTraining() {
  return (
    <Container className="py-5">
      <Row className="align-items-center justify-content-center mx-auto g-4">
        <Col md={5}>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Media Training"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h2 className=" h2 mb-3 fw-bold">Why Choose Our Training?</h2>
          <p>
            Our media training program is designed for aspiring livestreamers, 
            broadcasters, and content creators. Learn from industry experts 
            and gain hands-on experience with professional equipment.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutTraining;
