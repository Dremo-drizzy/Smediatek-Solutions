import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function PastStreams() {
  useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
  const videos = [
    {
      title: "UYPCF Conference 2025",
      url: "https://www.youtube.com/live/6HVkpwyyCQg?si=l3l8BftA8g8A8jwb",
      desc: "Live streaming.",
      delay: "0",
    },
    {
      title: "BookHub Collaborative Authoring Workshop DAY 2",
      url: "https://www.youtube.com/live/jW8M6bcNnF4?si=ugirhbKgJhF1n2WW",
      desc: "Live performance sample.",
      delay: "200",
    },
    
  ];

  return (
    <Container fluid className="py-5" data-aos="fade-up">
      <h2 className="text-center orange h1 mb-4">Past Livestreams</h2>
      <Row className="g-4 justify-content-center mx-auto">
        {videos.map((v, i) => (
          <Col md={4} key={i} data-aos="fade-up"
            data-aos-delay={v.delay}>
            <Card className="h-100 shadow border-0 ">
              <div className="ratio ratio-16x9">
                <ReactPlayer url={v.url} width="100%" height="100%" controls />
              </div>
              <Card.Body>
                <Card.Title>{v.title}</Card.Title>
                <Card.Text className="text-muted">{v.desc}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="outline-primary" size="sm" href={v.url} target="_blank">
                    Open
                  </Button>
                  <small className="text-muted">2:34:10 • 1.2k views</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PastStreams;
