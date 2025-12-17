import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav, NavDropdown } from "react-bootstrap";
import "../css/Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
    <Container
      fluid
      id="colophon"
      role="contentinfo"
      className="Footer text-light pt-5 px-5"
    >
      <Row className="mb-4 ">
        <Col lg={4} md={6} className="mb-4">
          <h2 className="footer-h2 fw-bold ">SmediaTek-Solutions</h2>
          <p>
            Website Design and Digital Marketing Agency in Nigeria. Our mission
            is to help businesses and organizations of all sizes grow and
            succeed digitally.
          </p>
          <div className="d-flex gap-3">
            <a href="https://youtube.com/@smarttekmediasolutions?si=ncC0cK24oecVeH7-" target="_blank" rel="noreferrer">
              <i className="bi bi-youtube text-light fs-5"></i>
            </a>
            <a
              href="https://www.instagram.com/smediatek?igsh=MTNyZTUydXFueDFhYw=="
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-instagram text-light fs-5"></i>
            </a>   
          </div>
        </Col>

        <Col lg={2} md={6} className="mb-4">
          <h4>Quick Links</h4>
          <Nav className="d-flex flex-column">
            <Nav.Link as={Link} to="/Home" className="Footer-link text-light">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/About" className="Footer-link text-light">
              About
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Contact"
              className="Footer-link text-light"
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Projects"
              className="Footer-link text-light"
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Projects"
              className="Footer-link text-light"
            ></Nav.Link>
          </Nav>
        </Col>

        <Col lg={2} md={6} className="mb-4">
          <h4>Our Services</h4>
          <Nav className=" d-flex flex-column">
            <Nav.Link
              as={Link}
              to="/BrandIdentityPage"
              className="Footer-link text-light"
            >
              BrandIdentityPage
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Livestreaming"
              className="Footer-link text-light"
            >
              Livestreaming
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/MediaTraining"
              className="Footer-link text-light"
            >
              MediaTraining
            </Nav.Link>
          </Nav>
        </Col>

        <Col className="mb-4" lg={4} md={6}>
          <h4>Contact Info:</h4>
          <p>
            <i className="bi bi-geo-alt"></i>
            Lagos, Nigeria
          </p>
          <p>
            <a
              href="mailto:smediateksolutions@gmail.com"
              className="text-light"
            >
              <i className="bi bi-envelope"></i>smediateksolutions@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+2349011952759" className="text-light">
              <i className="bi bi-telephone"></i> +2349011952759
            </a>
          </p>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col className="text-center pt-2">
          <p>© 2025 SmediaTek-Solutions Ltd.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
