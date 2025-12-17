import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import About from "./Pages/About.jsx";
import Home from "./Pages/Home.jsx";
import Projects from "./Pages/Projects.jsx";
import Contact from "./Pages/Contact.jsx";
import BrandIdentityPage from "./Pages/Services/BrandIdentityPage.jsx";
import Livestreaming from "./Pages/Services/Livestreaming.jsx";
import MediaTraining from "./Pages/Services/MediaTraining.jsx";
import SmediaNavbar from "./Components/SmediaNavbar.jsx";
import Footer from "./Pages/Footer.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import { Spinner } from "react-bootstrap";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 bg-light"
        style={{ flexDirection: "column" }}
      >
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 fw-semibold text-secondary">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <SmediaNavbar />

      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/BrandIdentityPage" element={<BrandIdentityPage />} />
        <Route path="/Livestreaming" element={<Livestreaming />} />
        <Route path="/MediaTraining" element={<MediaTraining />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
