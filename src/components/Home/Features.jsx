import { Container, Row, Col } from "react-bootstrap";
import { Flower1, SuitHeart, Truck } from "react-bootstrap-icons";
const Features = () => {
    return (
        <Container
            fluid="xl"
            className="feature-container d-none d-md-flex justify-content-center py-5"
        >
            <Row className="w-100 d-flex align-items-center justify-content-center">
                <Col
                    md={4}
                    className="d-flex align-items-center justify-content-center px-5"
                >
                    <Truck size="40px" color="#D68C45" />
                    <div className="ps-4">
                        <h5>Local Pickup</h5>
                        <p>Click and collect from our nursery.</p>
                    </div>
                </Col>
                <Col
                    md={4}
                    className="d-flex align-items-center justify-content-center px-5"
                >
                    <Flower1 size="50px" color="#D68C45" />
                    <div className="ps-4">
                        <h5>Shipping Locations</h5>
                        <p>We ship all our products around Brisbane. </p>
                    </div>
                </Col>
                <Col
                    md={4}
                    className="d-flex align-items-center justify-content-center px-5"
                >
                    <SuitHeart size="40px" color="#D68C45" />
                    <div className="ps-4">
                        <h5>Our Guarantee</h5>
                        <p>We only provide the best quality plants.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Features;
