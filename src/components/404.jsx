
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container fluid="xl" className="not-found py-5">
      <h2>Sorry</h2>
      <p>This page cannot be found</p>
      <Link to="/" className="text-decoration-underline">Click here to back to the homepage...</Link>
    </Container>
  );
}

export default NotFound;