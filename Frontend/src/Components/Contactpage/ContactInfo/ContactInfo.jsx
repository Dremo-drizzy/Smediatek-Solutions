import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./ContactInfo.css";

function ContactInfo() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const contacts = [
    {
      icon: "bi-geo-alt-fill",
      title: "Office Address",
      text: "Lagos, Nigeria.",
      delay: "0",
    },
    {
      icon: "bi-telephone-fill",
      title: "Phone & Email",
      text: (
        <>
          <div>📞 Contact Us: +2349011952759</div>
          <div>📧 Email: smediateksolutions@gmail.com</div>
        </>
      ),
      delay: "200",
    },
    {
      icon: "bi-clock-fill",
      title: "Working Hours",
      text: (
        <>
          <div>Mon–Fri: 9:00 AM – 6:00 PM</div>
          <div>Sat: 10:00 AM – 4:00 PM</div>
          <div>Sun: Closed</div>
        </>
      ),
      delay: "400",
    },
  ];

  return (
    <Container fluid className="py-5">
      <h2 className="text-center fw-bold h1 orange mb-2" data-aos="fade-up">
        Get in Touch
      </h2>
      <p className="text-center mb-5 text-muted" data-aos="fade-up" data-aos-delay="100">
        Reach out to us for inquiries, collaborations, or support. 
        We’re always happy to connect with you.
      </p>

      <Row className="g-4 justify-content-center mx-auto">
        {contacts.map((contact, index) => (
          <Col
            key={index}
            sm={12}
            md={4}
            lg={4}
            data-aos="fade-up"
            data-aos-delay={contact.delay}
          >
            <Card className="contact-card text-center w-100 h-100 p-3">
              <div className="contact-icon mx-auto mb-3">
                <i className={`bi ${contact.icon}`}></i>
              </div>
              <Card.Title className="fw-bold mb-2">
                {contact.title}
              </Card.Title>
              <Card.Text className="contact-text">{contact.text}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ContactInfo;
