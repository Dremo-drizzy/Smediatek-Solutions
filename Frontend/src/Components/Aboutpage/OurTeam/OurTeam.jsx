import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./OurTeam.css";

function OurTeam() {
  useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);
  const members = [
    {
      name: "Daniel Nwachukwu",
      role: "Developer",
      desc: "The mastermind behind our tech, Daniel is the go-to expert for everything from web integration and streaming technology to automating digital systems. He's the reason our tech is always on point.",
      img: "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg", 
      delay: "0",
    },
    {
      name: "John Hunyingan",
      role: "Manager",
      desc: "As our project manager, John is the glue that holds everything together. He's a master of organization and ensures that every project runs smoothly, on time, and to the highest standard.",
      img: "https://th.bing.com/th/id/OIP.E2lwe-_bLJWe3ohKGzh6sAHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", 
      delay: "200",
    },
    {
      name: "Treasure Enyinnaya",
      role: "Customer Experience Specialist",
      desc: "Treasure is the heart of our customer experience. With her warm and friendly approach, she makes sure every client feels like a part of the SmediaTek family. She's dedicated to making your experience with us exceptional.",
      img: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg", 
      delay: "400",
    },
  ];

  return (
    <Container fluid className="py-5 mt-5" data-aos="fade-up">
      <Row className="g-4 justify-content-center">
        <Row className="justify-content-center text-center">
          <Col>
            <h2 data-aos="fade-up" className="h1 fw-bold orange">Meet Our Team</h2>
            <p  data-aos="fade-up" data-aos-delay="150">
              Meet the amazing people who make our startup a success.
            </p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {members.map((member, idx) => (
            <Col key={idx} xs={12} sm={6} lg={4} data-aos="fade-up"
            data-aos-delay={member.delay}>
              <Card className="team-card h-100  border-0">
                <div className="team-img-wrapper">
                  <Card.Img
                    variant="top"
                    src={member.img}
                    className="team-img"
                    alt={member.name}
                  />
                </div>
                <Card.Body className="text-center p-4">
                  <Card.Title className="orange">{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2">{member.role}</Card.Subtitle>
                  <Card.Text>{member.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
}

export default OurTeam;
