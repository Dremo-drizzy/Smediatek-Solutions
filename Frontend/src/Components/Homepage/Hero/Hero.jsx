import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <div className="home-hero d-flex flex-column">
      <Row className="justify-content-center flex-grow-1 align-items-center text-center">
        <Col xs={11} sm={10} md={9} lg={8} xl={7}>
          <span className="pill-badge mb-4">
            <span className="pulse-dot" aria-hidden="true" />
            Live &bull; Creative &bull; Connected
          </span>

          <h1 className="hero-headline fw-bold mb-4">
            Where Media Meets <span className="gradient-text">Technology</span>.
          </h1>

          <p className="hero-subtext mx-auto mb-4">
            We bring your vision to life online. Whether it's through professional live
            streaming, building a strong brand identity, or providing expert tech training,
            we create digital experiences that truly connect and deliver.
          </p>

          <Row className="justify-content-center g-3 hero-cta-row">
            <Col xs={12} sm="auto">
              <Link to="/Contact" className="d-block">
                <Button className="px-4 w-100">
                  Contact Us <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm="auto">
              <Link to="/Livestreaming" className="d-block">
                <Button variant="outline-light" className="px-4 w-100">
                  Livestreaming <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Hero;
