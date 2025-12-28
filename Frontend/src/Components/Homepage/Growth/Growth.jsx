import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
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
    <Container fluid className="growth-container">
      <Row className="justify-content-center gx-4"> 
        {highlights.map((item, index) => (
          <Col
            key={index}
            md={3}
            sm={6}
            xs={12}
            className={`${
              index !== highlights.length - 1 ? "with-divider" : ""
            } text-center`}
            data-aos="fade-up"
            data-aos-delay={item.delay}
          >
            <div className="growth-item px-3"> 
              <div className="growth-stat">
                <CountUp
                  start={0}
                  end={item.stat}
                  duration={2.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>{item.suffix}</span>
              </div>

              <div className="growth-title mt-3">
                {item.title}
              </div>

              <div className="growth-desc px-lg-3 mt-1">
                {item.description}
              </div>
             
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Growth;