import { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";

const Help = () => {
    // scroll to top when navigate to the page
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);
    return (
        <Container fluid="xl" className="py-5">
            <h1 className="mb-3">How to make a purchase?</h1>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    STEP 1: Login to your account or create a new account and
                    login
                </ListGroup.Item>
                <ListGroup.Item>
                    STEP 2: View the products and add product to your shopping
                    cart
                </ListGroup.Item>
                <ListGroup.Item>
                    STEP 3: Go to your cart page, view order summary
                </ListGroup.Item>
                <ListGroup.Item>
                    STEP 4: Click Pay With Card Button
                </ListGroup.Item>
                <ListGroup.Item>
                    STEP 5: Input your card details to finish the payment
                </ListGroup.Item>
            </ListGroup>
        </Container>
    );
};

export default Help;
