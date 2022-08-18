import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
    render() {
        return (
            <Container fluid="xl" className="py-5">
                <h2>Sorry</h2>
                <p>This page cannot be found</p>
                <Link to="/" className="text-decoration-underline">
                    Click here to back to the homepage...
                </Link>
            </Container>
        );
    }
}

export default NotFound;
