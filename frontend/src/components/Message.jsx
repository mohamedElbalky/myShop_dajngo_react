import React from "react";

import Alert from "react-bootstrap/Alert";

export default function Message({ type, children }) {

  return (
    <Alert variant={type}>
      <Alert.Heading>Error 😞</Alert.Heading>
      <p>{children}</p>
      
    </Alert>
  );
}
