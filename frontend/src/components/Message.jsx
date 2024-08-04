import React from "react";

import Alert from "react-bootstrap/Alert";

export default function Message({ type, children }) {

  return (
    <Alert variant={type}>
      <Alert.Heading>Error 😞</Alert.Heading>
      <p>{children}</p>
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </Alert>
  );
}
