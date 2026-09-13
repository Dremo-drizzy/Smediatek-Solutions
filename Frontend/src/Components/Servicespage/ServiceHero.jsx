import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ServiceHero.css';

const ServiceHero = ({ title, subtitle, children}) => {
  return (
    <>
    <Container fluid className="body d-flex flex-column">
      <Row className="hero-responsive text-center justify-content-center flex-grow-1 align-items-center">
        <Col xs={11} sm={9} md={8} lg={7} xl={6}>
           <h1 className="display-sm-5 display-md-4 display-lg-6 fw-bold mb-3 mb-md-4">
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
