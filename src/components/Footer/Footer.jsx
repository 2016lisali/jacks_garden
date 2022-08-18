import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
    EnvelopeFill,
    Facebook,
    GeoAltFill,
    Instagram,
    Question,
    TelephoneFill,
    Youtube,
} from "react-bootstrap-icons";
import Newsletter from "./Newsletter";

const Footer = () => {
    return (
        <Container fluid className="px-0 footer">
            <Newsletter />
            <Container className="center pt-5" fluid="xl">
                <Row>
                    <Col sm className="pb-4">
                        <h3 className="fw-bolder">JACK'S GARDEN</h3>
                        <p>
                            A small but lovely garden located in south Brisbane
                        </p>
                        <div className="social-container">
                            <Facebook color="#3B5999" size={25} />
                            <Youtube
                                color="#E4405F"
                                size={25}
                                className="mx-2"
                            />
                            <Instagram color="#DA1212" size={25} />
                        </div>
                    </Col>
                    <Col sm className="pb-4">
                        <p className="fw-bolder fs-5 mb-2">Useful Links</p>
                        <ul className="row row-cols-2 px-0 my-0">
                            <li className="col list-unstyled mb-2">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="col list-unstyled mb-2">
                                <Link to="/account">My Account</Link>
                            </li>
                            <li className="col list-unstyled mb-2">
                                <Link to="/cart">Cart</Link>
                            </li>
                            <li className="col list-unstyled mb-2">
                                <Link to="/">Shipping</Link>
                            </li>
                            <li className="col list-unstyled mb-2">
                                <Link to="/">Terms</Link>
                            </li>
                            <li className="col list-unstyled mb-2">
                                <Link to="/help">
                                    <Question
                                        size="20px"
                                        alt="link to the cart page"
                                    />
                                    help
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    <Col sm className="pb-4 d-flex flex-column">
                        <p className="fw-bolder fs-5 mb-2">Contact</p>
                        <div className="mb-2">
                            <GeoAltFill className="me-2" />
                            18 Lucky St, Wishart QLD
                        </div>
                        <a
                            className="mb-2"
                            href="mailto: admin@jacksgarden.com"
                        >
                            <EnvelopeFill className="me-2" />
                            jack@jacksgarden.com
                        </a>
                        <a href="tel:+0449260373">
                            <TelephoneFill className="me-2" />
                            +61 044 912 3456
                        </a>
                    </Col>
                </Row>
                <hr />
                <p className="text-center small text-secondary pb-3 mb-0">
                    ©2022 Jack's Garden All rights reserved
                </p>
            </Container>
        </Container>
    );
};

export default Footer;
