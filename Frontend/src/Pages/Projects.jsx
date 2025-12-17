
import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Projects.css";

import Book from "../../assets/Bride/Book.jpg";
import Mug from "../../assets/Bride/Mug.jpg";
import Shirt from "../../assets/Bride/Shirt.jpg";

import Ad1 from "../../assets/Chocolla/ad-1.jpg";
import CoffeePouch from "../../assets/Chocolla/Coffee-Pouch.jpg";
import CoffeePouchEP from "../../assets/Chocolla/Coffee-PouchEP.jpg";

import Bcard3Back from "../../assets/GlobalXT/bcard-3-back.jpg";
import Cap from "../../assets/GlobalXT/cap.jpg";
import Polo from "../../assets/GlobalXT/polo.jpg";

import LogoDeepBlue from "../../assets/IEAD/Logo on deep blue.png";
import WhitePolo from "../../assets/IEAD/White Polo Presentation .png";
import Youths from "../../assets/IEAD/Youths.png";
import WaterBottle from "../../assets/IEAD/Water bottle .png";

import ServiceHero from "../Components/Servicespage/ServiceHero";

const sections = [
  {
    heading: "Bride",
    items: [
      {
        image: Book,
        title: "Wedding Invite Design",
        desc: "Elegant, print-ready invitation with premium typography and gold accents.",
        subtext:
          "A luxurious invitation design crafted to set the tone for an unforgettable wedding.",
        shortDesc: "Elegant Wedding Invite",
      },
      {
        image: Mug,
        title: "Branded Merchandise",
        desc: "Custom souvenir mugs designed to match the wedding theme and palette.",
        subtext:
          "Personalized mugs that add a memorable touch to the wedding experience.",
        shortDesc: "Custom Branded Mugs",
      },
      {
        image: Shirt,
        title: "Bridal Party Apparel",
        desc: "Coordinated apparel mockups for the bridal party — polished & modern.",
        subtext:
          "Stylish apparel ensuring the bridal party looks cohesive and elegant.",
        shortDesc: "Bridal Party Apparel",
      },
    ],
  },

  {
    heading: "Chocolla",
    items: [
      {
        image: Ad1,
        title: "Campaign Poster",
        desc: "Bold poster artwork for seasonal coffee campaign — warm & rich tones.",
        subtext:
          "Eye-catching poster designed to drive excitement for Chocolla’s coffee launch.",
        shortDesc: "Bold Campaign Poster",
      },
      {
        image: CoffeePouch,
        title: "Primary Packaging",
        desc: "Sustainable pouch mockup with tactile finishes and clear branding.",
        subtext:
          "Eco-friendly packaging that highlights Chocolla’s premium coffee quality.",
        shortDesc: "Sustainable Coffee Pouch",
      },
      {
        image: CoffeePouchEP,
        title: "Extended Packaging Variant",
        desc: "Retail-ready variation optimized for shelf visibility and barcodes.",
        subtext:
          "Designed for retail success with bold branding and practical functionality.",
        shortDesc: "Retail-Ready Packaging",
      },
    ],
  },

  {
    heading: "GlobalXT",
    items: [
      {
        image: Bcard3Back,
        title: "Business Card (Back)",
        desc: "Minimal corporate card reverse — strong brand mark and contact layout.",
        subtext:
          "Sleek business card design reflecting GlobalXT’s professional identity.",
        shortDesc: "Minimal Business Card",
      },
      {
        image: Cap,
        title: "Merch Cap",
        desc: "Branded staff cap design intended for events and promotions.",
        subtext:
          "Custom cap for brand visibility during corporate events and promotions.",
        shortDesc: "Branded Event Cap",
      },
      {
        image: Polo,
        title: "Uniform Polo",
        desc: "Staff uniform design — breathable fabric mockup for corporate teams.",
        subtext:
          "Comfortable and branded polo for a unified corporate team appearance.",
        shortDesc: "Corporate Uniform Polo",
      },
    ],
  },

  {
    heading: "IEAD",
    items: [
      {
        image: LogoDeepBlue,
        title: "Primary Logo Mark",
        desc: "Core logo lockup for use across print and digital channels.",
        subtext: "A versatile logo design embodying IEAD’s mission and values.",
        shortDesc: "Core Brand Logo",
      },
      {
        image: WhitePolo,
        title: "Volunteer Polo",
        desc: "White polo mockup for volunteers, featuring embroidered crest.",
        subtext:
          "Professional polo for volunteers, showcasing IEAD’s brand pride.",
        shortDesc: "Volunteer Branded Polo",
      },
      {
        image: Youths,
        title: "Youth Program Poster",
        desc: "Campaign visual aimed at young adults — approachable & vibrant.",
        subtext:
          "Engaging poster to inspire and connect with IEAD’s youth community.",
        shortDesc: "Vibrant Youth Poster",
      },
      {
        image: WaterBottle,
        title: "Branded Bottle",
        desc: "Event merchandise bottle with subtle logo placement for giveaways.",
        subtext:
          "Practical and branded water bottle for IEAD’s event giveaways.",
        shortDesc: "Branded Event Bottle",
      },
    ],
  },
];

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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

            {sections.map((section, sIdx) => (
              <div key={sIdx} className="mb-5">
                <h3 className="text-secondary fw-bold mb-3 ">
                  {section.heading}
                </h3>

                <Row className="g-4">
                  {section.items.map((item, i) => (
                    <Col key={i} xs={12} sm={6} md={3} lg={3}>
                      <Card className="project-card h-100 w-100">
                        <div className="project-image-container">
                          <Card.Img
                            variant="top"
                            src={item.image}
                            alt={`${section.heading}-${i}`}
                            className="project-image rounded"
                            loading="lazy"
                          />
                          <div className="project-image-overlay">
                            <p className="project-image-desc">{item.shortDesc}</p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

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
