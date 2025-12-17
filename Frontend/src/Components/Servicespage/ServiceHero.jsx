import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ServiceHero.css';

const ServiceHero = ({ title, subtitle, bgImage, children}) => {
  return (
    <>
    <Container fluid className="body d-flex flex-column"
    style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Row className="hero-responsive text-center justify-content-center flex-grow-1 align-items-center">
        <Col xs={11} sm={9} md={8} lg={7} xl={6} className="text-white">
           <h1 className=" display-sm-5 display-md-4 display-lg-3 fw-bold text-white mb-3 mb-md-4">
            {title}
          </h1>
          <p className="hero-text">
            {subtitle}
          </p>
          {children}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ServiceHero;
