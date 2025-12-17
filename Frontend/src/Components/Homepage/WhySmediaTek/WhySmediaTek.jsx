import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./WhySmediaTek.css";

function WhySmediaTek() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const usps = [
    {
      icon: "bi bi-gear-fill text-success fs-2",
      title: "Seamless Production & Support",
      description: "We've got you covered, from start to finish. Our team handles all the details—planning, setup, filming, and editing—so you can focus on what matters. We ensure a smooth, stress-free process and deliver on-time results, every time.",
      delay: "0",
    },
    {
      icon: "bi bi-lightbulb-fill text-primary fs-2",
      title: "Innovative Media Solutions",
      description: "We're not just about following trends—we're about setting them. Our team combines creative storytelling with the latest tech to create media experiences that don't just get noticed, but get results. We'll help your brand shine and connect with your audience in a meaningful way.",
      delay: "200",
    },
    {
      icon: "bi bi-bullseye text-danger fs-2",
      title: "Proven Results, Trusted by Clients",
      description: "Our track record speaks for itself. We've helped businesses across industries achieve their goals with our professional, high-quality media solutions. Our clients trust us to deliver results that not only look great but also drive growth and engagement.",
      delay: "400",
    },
    
  ];

  return (
    <Container fluid className="py-5">
      <Row className="text-center justify-content-center mb-3">
        <Col>
          <h2 className="h1 orange fw-bold" data-aos="fade-up">
            Why Choose SmediaTek?
          </h2>
          <p data-aos="fade-up" data-aos-delay="150">
            Discover what sets us apart in delivering impactful media solutions.
          </p>
        </Col>
      </Row>
      <Row className="g-4 mx-auto" >
        {usps.map((usp, index) => (
          <Col key={index} sm={12} md={6} lg={4} data-aos="fade-up" data-aos-delay={usp.delay}>
            <Card className="usp-card text-center h-100 w-100 p-4" >
              <Card.Body>
                <div className="ups-wrapper">
                  <i className={`bi ${usp.icon}`}></i>
                </div>
                <Card.Title className="my-2 fw-bold ups-card-title">{usp.title}</Card.Title>
                <Card.Text className="ups-text">{usp.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default WhySmediaTek;
