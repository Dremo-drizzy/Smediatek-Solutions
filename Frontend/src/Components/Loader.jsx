import React from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Loader = () => {
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
};

export default Loader;
