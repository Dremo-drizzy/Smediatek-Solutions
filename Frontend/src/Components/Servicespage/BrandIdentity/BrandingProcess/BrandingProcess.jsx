import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./BrandingProcess.css"

function BrandingProcess() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const processSteps = [
    {
      step: "1️⃣",
      title: "Discovery",
      desc: "We understand your business, goals, and target audience to create a clear brand direction.",
      delay: "0",
    },
    {
      step: "2️⃣",
      title: "Strategy",
      desc: "We craft your brand positioning, tone of voice, and messaging plan that aligns with your goals.",
      delay: "200",
    },
    {
      step: "3️⃣",
      title: "Design",
      desc: "We design your logo, visuals, and brand identity elements that reflect your essence.",
      delay: "400",
    },
    {
      step: "4️⃣",
      title: "Launch",
      desc: "We roll out your brand across digital channels and track its performance for maximum impact.",
      delay: "600",
    },
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center orange h1 fw-bold mb-4" data-aos="fade-up">
        Our Branding Process
      </h2>

      <Row className="g-4 text-center mx-auto">
        {processSteps.map((item, index) => (
          <Col
            md={3}
            sm={6}
            xs={12}
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
          >
            <Card className="p-4 h-100 border-0 brand-card">
              <Card.Title className="fw-bold fs-5 mb-2">
                {item.step} {item.title}
              </Card.Title>
              <Card.Text>{item.desc}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BrandingProcess;
