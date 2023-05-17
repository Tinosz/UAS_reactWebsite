import { Navbar, NavDropdown, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import React from "react";

function NavigationBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarToggle" />
        <Nav>
          <NavDropdown title="Browse" id="browseDropdown">
            <NavDropdown.Item>Popular</NavDropdown.Item>
            <NavDropdown.Item>Best-Sellers</NavDropdown.Item>
            <NavDropdown.Item>Recommended</NavDropdown.Item>
            <NavDropdown title="Genre" id="genreDropdown">
              <NavDropdown.Item>test</NavDropdown.Item>
              <NavDropdown.Item>test</NavDropdown.Item>
              <NavDropdown.Item>test</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
            <select id="searchBy">
                <option value="#">Authors</option>
                <option value="#">Books</option>
                <option value="#">Publishers</option>
            </select>
            <FormControl type="text" placeholder="Search" />
            <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
