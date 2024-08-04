import Spinner from "react-bootstrap/Spinner";

import React from "react";

export default function Laoder() {
  return (
    <Spinner
      animation="border"
      role="status"
      size="lg"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        marginTop: "200px",
        display: "block",
        color: "#777"
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
