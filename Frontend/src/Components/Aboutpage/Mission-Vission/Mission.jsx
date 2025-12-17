import { Container, Row, Col, Card } from "react-bootstrap";
import "./Mission.css";

function Mission() {
  return (
    <Container fluid className="py-5">
      <Row className="text-center text-white mb-2">
        <Col>
          <h1 className="h1 orange fw-bold mb-2" data-aos="fade-up">
            Our Mission & Vision
          </h1>
          <p className="text-white" data-aos="fade-up" data-aos-delay="200">
            Driving creativity, innovation, and impact through media solutions.
          </p>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        <Row className="g-4 justify-content-center">
          <Col lg={4} md={6} data-aos="zoom-in">
            <Card className="mission-card h-100 w-100 border-0 text-white p-2">
              <Card.Body className="text-center">
                <div className="mission-icon mb-3">🎯</div>
                <Card.Title className="my-2 text-primary fw-bold fs-4">
                  Our Mission
                </Card.Title>
                <Card.Text className="text-white">
                  To empower businesses, creators, and communities to share
                  their stories with the world. We're committed to delivering
                  creative and cutting-edge media solutions that make a lasting
                  impact and leave a memorable impression.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} data-aos="zoom-in">
            <Card className="mission-card h-100 w-100 border-0 text-white p-2">
              <Card.Body className="text-center">
                <div className="mission-icon mb-3">🌍</div>
                <Card.Title className="my-2 text-primary fw-bold fs-4">
                  Our Vision
                </Card.Title>
                <Card.Text className="text-white">
                  To be the go-to hub for innovative media solutions in Africa,
                  setting the standard for excellence in live streaming, brand
                  identity, and digital storytelling. We're passionate about
                  shaping the future of media and connecting people through
                  powerful and inspiring stories.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default Mission;
