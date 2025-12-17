import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./ImpactHighlights.css";

function ImpactHighlights() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Container fluid className="py-5" data-aos="fade-up">
      <Row className="justify-content-center align-items-center g-4 mx-auto">
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={6}
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2
            className="h1 orange fw-bold my-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Our Impact
          </h2>

          <p
            className="impact-text text-center text-lg-start"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            At SmediaTek Solutions, we blend creativity with technology to make
            your vision a reality. From hosting unforgettable events and
            building powerful brands to teaching in-demand skills, we deliver
            professional and affordable solutions across Nigeria. We're
            passionate about helping you thrive in the digital age, providing
            tailored design, tech, and training to help you and your business
            stand out.
          </p>

          <Button
            className="impact-button mb-5"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            See more <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </Col>

        <Col lg={5} md={5} sm={12} data-aos="fade-left" data-aos-delay="300">
          <Image
            fluid
            src="https://media.istockphoto.com/id/2207159331/photo/group-of-young-multi-ethnic-startup-business-team-collaborating-on-project-in-modern-office.jpg?s=612x612&w=0&k=20&c=wh2y4_SY2TymLpS2IpWUJrmoIQToTOlgXm7bL-ivRCg="
            alt="SmediaTek Impact Team"
            className="impact-image"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ImpactHighlights;
