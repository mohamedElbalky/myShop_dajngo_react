import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";

export default function Header({
  toRoot = "/",
  toCart = "/cart",
  toLogin = "/login",
}) {
  return (
    <header className="header">
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container fluid>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand>My Shop</Navbar.Brand>
          </Link>
          {/* <LinkContainer to={toRoot}>
            <Navbar.Brand>My Shop</Navbar.Brand>
          </LinkContainer> */}

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >

              <LinkContainer to={toCart}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart" aria-hidden="true"></i>{" "}
                  Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={toLogin}>
                <Nav.Link>
                  <i className="fas fa-user" aria-hidden="true"></i> login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
