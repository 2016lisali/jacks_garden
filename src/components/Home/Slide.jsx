import { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Button } from "react-bootstrap";

const Slide = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Container fluid className="slideContainer px-0">
            <Carousel
                fade
                interval="5000"
                activeIndex={index}
                onSelect={handleSelect}
            >
                <Carousel.Item className="slide1 d-flex flex-row justify-content-end align-items-center p-5"></Carousel.Item>
                <Carousel.Item className="slide2 d-flex flex-row justify-content-end align-items-center p-5"></Carousel.Item>
                <Carousel.Item className="slide3 d-flex flex-row justify-content-end align-items-center p-5"></Carousel.Item>
            </Carousel>
            <Container
                fluid="xl"
                className="info d-flex align-items-center justify-content-end"
            >
                <Container className="carouselInfo d-flex flex-column text-center align-items-center align-items-md-end pe-md-4">
                    <h1 className="fw-bold">Jack's Garden</h1>
                    <p className="my-4 fs-4 fw-bolder">
                        Quality plants at affordable prices!
                    </p>
                    <Link to="/products">
                        <Button variant="outline-light" size="lg">
                            SHOP NOW
                        </Button>
                    </Link>
                </Container>
            </Container>
        </Container>
    );
};

export default Slide;
