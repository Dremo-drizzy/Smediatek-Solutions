// src/pages/AdminDashboard.jsx
import React from "react";
import AdminMessages from "../components/AdminMessages";
import { Container } from "react-bootstrap";
import ServiceHero from "../Components/Servicespage/ServiceHero";


function AdminDashboard() {
  return (
    <div>
      <ServiceHero 
        bgImage="https://as2.ftcdn.net/v2/jpg/00/01/70/21/1000_F_1702184_I8Sgw2zR3Nc4AHN7aXmWzAGDpUJdS3.jpg"
      />
      <Container className="py-5">
        <h1 className="text-center mb-4 fw-bold text-primary">Admin Dashboard</h1>
        <AdminMessages />
      </Container>
    </div>
  );
}

export default AdminDashboard;
