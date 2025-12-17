import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CTA.css";

const CTA = () => {
  return (
    <Container fluid className="pb-5">
      <Row className="cta-section d-flex align-items-center justify-content-center text-center mx-auto w-lg-75">
        <Col>
          <h2 className="h1 orange fw-bold" data-aos="fade-up">
            Ready to Take the Next Step?
          </h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Ready to bring your vision to life? Let's collaborate and make it
            happen. Reach out today—we'd love to hear from you!
          </p>
          <Link className="link" to="/Contact">
            <Button  data-aos="fade-up" className="cta-button">
              Contact us <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CTA;
