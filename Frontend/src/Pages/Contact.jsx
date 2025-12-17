import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ServiceHero from '../Components/Servicespage/ServiceHero';
import ContactInfo from '../Components/Contactpage/ContactInfo/ContactInfo';
import ContactSection from '../Components/Contactpage/ContactSection/ContactSection';

function Contact() {
  return (
    <>
    <div className="contact-page">
      <ServiceHero
        title="Get in Touch"
        subtitle="We’d love to hear from you. Reach out to us for inquiries, collaborations, or support."
        bgImage="https://images.unsplash.com/photo-1521791136064-7986c2920216"
      />
      <ContactInfo/>
      <ContactSection/>
    </div>
    </>
  );
}
export default Contact;