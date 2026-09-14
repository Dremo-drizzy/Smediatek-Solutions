
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Projects.css";

import ServiceHero from "../Components/Servicespage/ServiceHero";
import api from "../utils/api";

const groupByCategory = (items) =>
  items.reduce((sections, item) => {
    let section = sections.find((s) => s.heading === item.category);
    if (!section) {
      section = { heading: item.category, items: [] };
      sections.push(section);
    }
    section.items.push(item);
    return sections;
  }, []);

const Projects = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPortfolio = async () => {
      try {
        const res = await api.get("/portfolio");
        setSections(groupByCategory(res.data));
      } catch (err) {
        console.error("❌ Error fetching portfolio:", err);
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <>
      <ServiceHero
        title="Showcasing Our Creative Projects"
        subtitle="Discover our portfolio of innovative brand identities, packaging, and marketing visuals designed to elevate businesses and captivate audiences."
        bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
      />
      <Container fluid className="py-5">
        <Row className="justify-content-center mx-auto">
          <Col>
            <h2 className="text-center h1 orange fw-bold mb-2">
              Our Brand Showcase
            </h2>
            <p className="text-center text-muted mb-5">
              Explore curated brand identities, packaging and marketing visuals
              crafted to inspire and elevate businesses.
            </p>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" className="text-primary" />
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              sections.map((section, sIdx) => (
                <div key={sIdx} className="mb-5">
                  <h3 className="text-secondary fw-bold mb-3 ">
                    {section.heading}
                  </h3>

                  <Row className="g-4">
                    {section.items.map((item) => (
                      <Col key={item._id} xs={12} sm={6} md={3} lg={3}>
                        <Card className="project-card glass-card h-100 w-100">
                          <div className="project-image-container">
                            <Card.Img
                              variant="top"
                              src={item.imageUrl}
                              alt={item.title}
                              className="project-image rounded"
                              loading="lazy"
                            />
                            <div className="project-image-overlay">
                              <p className="project-image-desc">{item.description}</p>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))
            )}

            <h3 className="fw-bold pt-5 pb-3 h1 text-center orange">
              Social Media Accounts Managed
            </h3>
            <Row className="g-4 mb-5 mx-auto justify-content-center">
              <Col sm={4} md={2}>
                <Card className="social-card h-100 w-100">
                  <Card.Body>
                    <Card.Title className="fw-semibold">IVLead</Card.Title>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                      <a
                        href="https://www.instagram.com/_ivlead?igsh=cTJqZzhtOWs2NnM0"
                        className="text-danger fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={2}>
                <Card className="social-card h-100 w-100">
                  <Card.Body>
                    <Card.Title className="fw-semibold">Lifting Veils</Card.Title>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                      <a
                        href="https://www.tiktok.com/@lifting_veils?_t=ZM-8uCyOZxAZuR&_r=1"
                        className="text-dark fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-tiktok"></i>
                      </a>
                      <a
                        href="https://youtube.com/@lifting-veils?si=Rd7FhRplC5oBfh_7"
                        className="text-danger fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-youtube"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={2}>
                <Card className="social-card h-100 w-100">
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      Asoebi Essentials
                    </Card.Title>
                    <div className="d-flex justify-content-center mt-2">
                      <a
                        href="https://www.instagram.com/asoebi_essentials?igsh=MWwxOWt1MHR3cWd4dg=="
                        className="text-danger fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={2}>
                <Card className="social-card h-100 w-100">
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      Assahkent Travels
                    </Card.Title>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                      <a
                        href="https://www.instagram.com/assahkenttravels?igsh=MXNucWp6d2ZmYnUx"
                        className="text-danger fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/assah-kent-travels-limited/"
                        className="text-primary fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={2}>
                <Card className="social-card h-100 w-100">
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      Accountech Academy
                    </Card.Title>
                    <div className="d-flex justify-content-center mt-2">
                      <a
                        href="https://www.instagram.com/accountechacademy?igsh=ZzlzbGFvMHQ4eGhh"
                        className="text-danger fs-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Projects;
