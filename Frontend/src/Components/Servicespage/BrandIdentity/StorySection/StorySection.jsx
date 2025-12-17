import { Container, Row, Col, Image} from "react-bootstrap";
import "./StorySection.css"

export default function StorySection() {
  return (
    <Container fluid className="py-5">
      <Row className="align-items-center justify-content-center g-4 mx-auto">
        <Col lg={5} md={5} data-aos="fade-right">
        <Image
        fluid
        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80"
        alt="Creative process"
        className="img-fluid"
        />
        </Col>
        <Col data-aos="fade-left" xs={12} sm={12} md={6} lg={6}>
          <h2 className="h1 orange fw-bold  my-3">Why Your Brand Identity Matters</h2>
          <p>
            A strong brand identity sets you apart, builds trust, and
            communicates who you are before you say a word. At{" "}
            <b>SmediaTek Solutions</b>, we combine strategy, creativity, and
            technology to make your brand shine across every platform.
          </p>
          <ul className=" list-unstyled">
            <li>✔️ Professional logo and visual design</li>
            <li>✔️ Brand voice and messaging strategy</li>
            <li>✔️ Digital presence and social media branding</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
