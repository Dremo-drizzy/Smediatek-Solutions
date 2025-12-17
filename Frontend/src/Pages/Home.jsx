import WhySmediaTek from "../Components/Homepage/WhySmediaTek/WhySmediaTek";
import ImpactHighlights from "../Components/Homepage/ImpactHighlights/ImpactHighlights";
import OurServices from "../Components/Homepage/OurServices/OurServices";
import CTA from "../Components/Homepage/CTA/CTA";
import "../css/Home.css";
import ServiceHero from "../Components/Servicespage/ServiceHero";
import Growth from "../Components/Homepage/Growth/Growth";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homepage-wrapper">
      <ServiceHero
        title="Where Media Meets Technology."
        subtitle="We bring your vision to life online. Whether it's through professional live streaming, building a strong brand identity, or providing expert tech training, we create digital experiences that truly connect and deliver."
        bgImage="https://th.bing.com/th/id/R.eacd25ec346eab881820aac67502d34d?rik=O%2f8RCdN7ttZhjw&riu=http%3a%2f%2fwww.futurefilmmaking.com%2fimages%2frode-filmmaker-kit.jpg&ehk=UlcWJwgndO12niDC7ZbDHWqINwtBDkNvHWObncySPrI%3d&risl=&pid=ImgRaw&r=0"
      >
        <Row className="justify-content-center g-4 ">
          <Col lg={5} md={5}>
            <Link to="/Contact">
              <Button
                className="px-4 home-button rounded-pill h-100 w-100 "
              >
                Contact Us <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Link>
          </Col>
          <Col lg={5} md={5}>
            <Link to="/Livestreaming">
              <Button

                className="px-4 home-two-button rounded-pill btn-outline-light h-100 w-100 "
              >
                Livestreaming <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Link>
          </Col>
        </Row>
      </ServiceHero>

      <div className="mid-white">
        <Growth />
      </div>

      <ImpactHighlights />

      <div className="parallax-bg">
        <OurServices />
      </div>

      <WhySmediaTek />
      

      <CTA />
    </div>
  );
}

export default Home;
