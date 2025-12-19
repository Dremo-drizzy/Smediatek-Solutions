import { Container, Row, Col } from "react-bootstrap";
import "./Learn.css"

function Learn() {
  const learnItems = [
    {
      icon: "🎥",
      title: "Livestream Production",
      desc: "Learn to set up, manage, and broadcast professional livestreams for events, conferences, and productions.",
    },
    {
      icon: "🎙️",
      title: "On-Camera Skills",
      desc: "Develop confidence and presentation techniques that help you perform naturally and effectively in front of the camera.",
    },
    {
      icon: "💻",
      title: "Technical Skills",
      desc: "Understand key tools like OBS, cameras, and editing software while learning how to manage full streaming workflows.",
    },
    {
      icon: "📡",
      title: "Broadcast Management",
      desc: "Get hands-on experience managing real-time broadcasts and coordinating technical teams during live sessions.",
    },
    {
      icon: "🎬",
      title: "Content Creation",
      desc: "Master storytelling, scripting, and editing techniques to craft engaging digital media content.",
    },
    {
      icon: "📈",
      title: "Audience Engagement",
      desc: "Learn how to analyze viewer data, boost engagement, and grow your media reach effectively.",
    },
  ];

  return (
      <Container className="py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold h1 orange">What You’ll Learn</h2>
          <p className="text-muted mt-3 mx-auto">
            Our media training program equips you with real-world media production skills —
            from livestream setup and content creation to audience engagement and technical mastery.
          </p>
        </div>

        <Row className="g-4 mx-auto">
          {learnItems.map((item, index) => (
            <Col md={4} key={index}>
              <div className="p-3 h-100 w-100 learn-box text-center">
                <h4 className="fw-bold mb-3">
                  {item.icon} {item.title}
                </h4>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

  );
}

export default Learn;
