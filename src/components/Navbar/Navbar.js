import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Navs() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">KnowYourAPI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link> {/* Link to Home */}
                        <Nav.Link as={Link} to="/search/page1">Link</Nav.Link> {/* Link to Page1 */}
                        <Nav.Link as={Link} to="/search/page2">Text</Nav.Link> {/* Link to Page2 */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}