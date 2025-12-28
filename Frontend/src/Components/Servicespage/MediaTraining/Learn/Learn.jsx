import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Learn.css";
import { useEffect } from "react";

function Learn() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const learnItems = [
    {
      icon: "🎥",
      title: "Livestream Production",
      desc: "Learn to set up, manage, and broadcast professional livestreams for events, conferences, and productions.",
      delay: 0,
    },
    {
      icon: "🎙️",
      title: "On-Camera Skills",
      desc: "Develop confidence and presentation techniques that help you perform naturally and effectively in front of the camera.",
      delay: 150,
    },
    {
      icon: "💻",
      title: "Technical Skills",
      desc: "Understand key tools like OBS, cameras, and editing software while learning how to manage full streaming workflows.",
      delay: 300,
    },
    {
      icon: "📡",
      title: "Broadcast Management",
      desc: "Get hands-on experience managing real-time broadcasts and coordinating technical teams during live sessions.",
      delay: 450,
    },
    {
      icon: "🎬",
      title: "Content Creation",
      desc: "Master storytelling, scripting, and editing techniques to craft engaging digital media content.",
      delay: 600,
    },
    {
      icon: "📈",
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
            <Card className="h-100 text-center  learn-card">
              <Card.Body>
                <div className="learn-icon mb-3">{item.icon}</div>
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
