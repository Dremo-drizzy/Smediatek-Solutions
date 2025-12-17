import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./OurServices.css";

function OurServices() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const services = [
    {
      title: "Livestreaming",
      subtitle: "Share your story with the world in stunning HD. We offer professional live streaming services for any event, anytime, anywhere.",
      img: "https://tse4.mm.bing.net/th/id/OIP.CdmrE5aeNLPjaii0QaNLRQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/livestreaming",
      icon: "bi-broadcast-pin",
      delay: "0",
    },
    {
      title: "Brand Identity",
      subtitle: "Your brand is your story. We'll help you tell it with a powerful and unforgettable identity that captures attention and builds loyalty.",
      img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/brandidentity",
      icon: "bi-palette-fill",
      delay: "200",
    },
    {
      title: "Media Training",
      subtitle: "Master the media with our expert-led training. We'll equip you with the skills and confidence to shine in front of the camera and behind the mic.",
      img: "https://tse4.mm.bing.net/th/id/OIP.BXalmszrtyTUvynxTdloRgHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/mediatraining",
      icon: "bi-mic-fill",
      delay: "400",
    },
  ];

  return (
    <Container
      fluid
      className="py-5"
      data-aos="fade-up"
    >
      <div className="text-center mb-5" data-aos="fade-up" data-aos-delay="100">
        <h2 className="orange h1 fw-bold">Our Services</h2>
        <p className="text-white">
          We deliver top-quality creative and digital media solutions.
        </p>
      </div>

      <Row className="g-4 mx-auto justify-content-center">
        {services.map((service, index) => (
          <Col
            md={4}
            sm={6}
            xs={12}
            key={index}
            data-aos="fade-up"
            data-aos-delay={service.delay}
          >
            <Card className="service-card h-100 shadow-sm border-0">
              <div className="card-img-wrapper position-relative">
                <Card.Img variant="top" src={service.img} className="service-img" />
                <div className="card-overlay d-flex justify-content-center align-items-center">
                  <i className={`bi ${service.icon} fs-5 text-primary`}></i>
                </div>
              </div>

              <Card.Body className="p-4 text-center">
                <Card.Title className="orange fw-bold">{service.title}</Card.Title>
                <Card.Text>{service.subtitle}</Card.Text>
                <Link className="link" to={service.link}>
                  See more <i className="bi bi-arrow-right"></i>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OurServices;
