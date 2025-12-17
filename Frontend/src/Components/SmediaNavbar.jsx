import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SmediaNavbar.css";

function SmediaNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      variant="dark"
    >
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/smediatek.png"
            alt="Logo"
            width="200"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand"
          aria-labelledby="offcanvasNavbarLabel-expand"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="title" id="offcanvasNavbarLabel-expand">
              SmediaTek Solutions
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">

              <Nav.Link as={Link} to="/Home" className="navbar-nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/About" className="navbar-nav-link">
                About
              </Nav.Link>

              <NavDropdown
                title={<span className="text-white ms-4 ">Services</span>}
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/BrandIdentityPage">
                  BrandIdentityPage
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Livestreaming">
                  Livestreaming
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/MediaTraining">
                  MediaTraining
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/Contact" className="navbar-nav-link">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/Projects" className="navbar-nav-link">
                Projects
              </Nav.Link>
            </Nav>

            <div className="community-links visually-hidden">
              <a href="https://twitter.com" target="_blank">
                <img src="X.svg" alt="X" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <img src="/Linkedin.svg" alt="LinkedIn" />
              </a>
              <a href="https://discord.com" target="_blank">
                <img src="/discord.svg" alt="Discord" />
              </a>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default SmediaNavbar;
