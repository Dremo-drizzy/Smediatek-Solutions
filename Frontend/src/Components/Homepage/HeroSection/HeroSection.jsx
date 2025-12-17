import { Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./HeroSection.css";

function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container fluid className="body overflow-hidden d-flex flex-column">
      <Row className="hero-responsive text-center justify-content-center flex-grow-1 align-items-center">
        <Col xs={11} sm={9} md={8} lg={7} xl={6} className="text-white">
          <h1 className="display-6 display-sm-5 display-md-4 display-lg-3 fw-bold text-white mb-3 mb-md-4">
            Smart Streaming, Real Impact.
          </h1>
          <p className="mb-4 mb-md-5 hero-text px-1 px-sm-2 px-md-0">
            Deliver flawless livestreams across entertainment, sports,
            corporate, and education. Engage audiences in real time with
            interactive features and crystal-clear quality. Built for scale,
            designed for impact — anywhere, anytime.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroSection;