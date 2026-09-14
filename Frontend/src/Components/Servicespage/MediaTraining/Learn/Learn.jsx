import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Learn.css";
import { useEffect } from "react";

const icons = {
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 9.5l6-3v11l-6-3" />
    </svg>
  ),
  presenter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  ),
  tower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21v-8" />
      <path d="M8 21h8" />
      <circle cx="12" cy="9" r="2" />
      <path d="M8.5 6a5 5 0 0 0 0 6" />
      <path d="M15.5 6a5 5 0 0 1 0 6" />
    </svg>
  ),
  clapper: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="1.5" />
      <path d="M3 8l2.5-4h12L20 8" />
      <path d="M7 5.5 9 8M13 5.5 15 8" />
    </svg>
  ),
  trending: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 19h18" />
      <path d="M6 15l4-4 3 3 5-6" />
      <path d="M14 8h4v4" />
    </svg>
  ),
};

function Learn() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const learnItems = [
    {
      icon: "camera",
      title: "Livestream Production",
      desc: "Learn to set up, manage, and broadcast professional livestreams for events, conferences, and productions.",
      delay: 0,
    },
    {
      icon: "presenter",
      title: "On-Camera Skills",
      desc: "Develop confidence and presentation techniques that help you perform naturally and effectively in front of the camera.",
      delay: 150,
    },
    {
      icon: "gear",
      title: "Technical Skills",
      desc: "Understand key tools like OBS, cameras, and editing software while learning how to manage full streaming workflows.",
      delay: 300,
    },
    {
      icon: "tower",
      title: "Broadcast Management",
      desc: "Get hands-on experience managing real-time broadcasts and coordinating technical teams during live sessions.",
      delay: 450,
    },
    {
      icon: "clapper",
      title: "Content Creation",
      desc: "Master storytelling, scripting, and editing techniques to craft engaging digital media content.",
      delay: 600,
    },
    {
      icon: "trending",
      title: "Audience Engagement",
      desc: "Learn how to analyze viewer data, boost engagement, and grow your media reach effectively.",
      delay: 750,
    },
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold h1 orange" data-aos="fade-right">What You’ll Learn</h2>
        <p className="text-muted mt-3 mx-auto" data-aos="fade-right">
          Our media training program equips you with real-world media production
          skills, from livestream setup and content creation to audience
          engagement and technical mastery.
        </p>
      </div>

      <Row className="g-4 my-3 mx-auto">
        {learnItems.map((item, index) => (
          <Col
            md={4}
            key={index}
            data-aos="fade-up"
            data-aos-delay={item.delay}
          >
            <Card className="h-100 text-center learn-card glass-card">
              <Card.Body>
                <div className="learn-icon mb-3">{icons[item.icon]}</div>
                <Card.Title className="fw-bold fs-4">{item.title}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Learn;
