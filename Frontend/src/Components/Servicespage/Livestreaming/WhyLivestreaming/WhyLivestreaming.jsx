import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./WhyLivestreaming.css"; // using same styling

function WhyLivestreaming() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const usps = [
    {
      icon: "bi bi-broadcast-pin text-primary fs-2",
      title: "Professional Livestream Quality",
      description:
        "Experience crystal-clear visuals and studio-grade audio for every event. We use professional cameras, switchers, and encoders to deliver HD and Full-HD livestreams across platforms like YouTube, Facebook, and Zoom.",
      delay: "0",
    },
    {
      icon: "bi bi-wifi text-success fs-2",
      title: "Reliable Internet & Zero Downtime",
      description:
        "Our team provides backup connections and technical monitoring to ensure your event stays online without interruption. You can focus on your program — we handle the broadcast stability from start to finish.",
      delay: "200",
    },
    {
      icon: "bi bi-people-fill text-warning fs-2",
      title: "Real-Time Engagement",
      description:
        "We make your livestream interactive. With integrated live chats, audience Q&A, and on-screen comments, your viewers can participate from anywhere — making every stream a shared experience.",
      delay: "400",
    },
    {
      icon: "bi bi-camera-reels-fill text-danger fs-2",
      title: "Multiple Camera Angles & Production",
      description:
        "Our team captures every moment from multiple perspectives using professional camera setups. We blend cinematic angles, graphics, and branding overlays to give your event a polished, TV-quality finish.",
      delay: "600",
    },
    {
      icon: "bi bi-headset text-info fs-2",
      title: "End-to-End Support",
      description:
        "From pre-event setup and on-site streaming to post-production editing, our experts handle everything. Whether it’s a wedding, conference, or concert — we ensure seamless execution and client satisfaction.",
      delay: "800",
    },
  ];

  return (
    <Container fluid className="py-5">
      <Row className="text-center justify-content-center mb-3 mx-auto">
        <Col>
          <h2 className="h1 orange fw-bold" data-aos="fade-up">
            Why Choose SmediaTek for Livestreaming?
          </h2>
          <p data-aos="fade-up" data-aos-delay="150">
            Discover why we’re trusted by individuals and organizations across Nigeria
            for professional, reliable, and high-quality event livestreaming.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mx-auto">
        {usps.map((usp, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={4}
            data-aos="fade-up"
            data-aos-delay={usp.delay}
          >
            <Card className="usp-card text-center h-100 w-100 p-3">
              <Card.Body>
                <div className="ups-wrapper">
                  <i className={usp.icon}></i>
                </div>
                <Card.Title className="my-2 fw-bold ups-card-title">
                  {usp.title}
                </Card.Title>
                <Card.Text className="ups-text">{usp.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default WhyLivestreaming;
