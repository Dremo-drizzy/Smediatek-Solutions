import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Growth.css";

function Growth() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const highlights = [
    {
      icon: "bi-globe",
      stat: 69,
      suffix: "+",
      title: "Students Trained",
      description:
        "Empowering the next generation of tech talent, from kids to adults, since 2022.",
      delay: "0",
    },
    {
      icon: "bi-star-fill",
      stat: 345,
      suffix: "+",
      title: "Events Streamed",
      description: "Bringing events to life online, with flawless live streaming across Nigeria.",
      delay: "200",
    },
    {
      icon: "bi-palette",
      stat: 50,
      suffix: "%",
      title: "Brands Developed",
      description:
        "Crafting unforgettable brand identities that tell a unique story.",
      delay: "400",
    },
    {
      icon: "bi-people-fill",
      stat: 5,
      suffix: "+",
      title: "States Reached",
      description: "Making an impact nationwide, with our services reaching clients in over 5 states.",
      delay: "600",
    },
  ];

  return (
    <Container fluid className="py-5">
      <Row className="g-4 mx-auto">
        {highlights.map((item, index) => (
          <Col
            key={index}
            md={3}
            sm={6}
            xs={12}
            data-aos="fade-up"
            data-aos-delay={item.delay}
          >
            <Card className="growth-card text-center w-100 h-100">
              <Card.Body>
                {/* CountUp animation */}
                <div className="mb-2">
                  <span className="growth-stat">
                    <CountUp
                      start={0}
                      end={item.stat}
                      duration={2.5}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span className="stat-suffix">{item.suffix}</span>
                  </span>
                </div>

                <Card.Title className="growth-title mt-2">
                  {item.title}
                </Card.Title>
                <Card.Text className="growth-desc">
                  {item.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Growth;
