import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { Button, Container, Row, Col, Modal, Table } from "react-bootstrap";
import {
    createOrder,
    createOrderDetails,
    makePayment,
    createOrderBillingDetails,
} from "../../api/api";
import {
    updateProductQuantity,
    removeProductFromCart,
    emptyShoppingCart,
} from "../../actions/cartAction";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Breadcrumbs, SuccessDiv } from "../index";

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [stripeToken, setStripeToken] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRemoveProduct = (data) => {
        removeProductFromCart(
            { ...data, userId: currentUser.userId },
            dispatch
        );
    };
    const handleEmptyCart = () => {
        emptyShoppingCart(
            { cartId: cart.cartId, userId: currentUser.userId },
            dispatch
        );
    };
    const onToken = (token) => {
        setStripeToken(token);
    };

    // scroll to top when navigate to the page
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    // stripe payment
    useEffect(() => {
        const makeRequest = async () => {
            setIsFetching(true);
            const date = new Date();
            const formattedDate = date.toISOString().split("T")[0];
            try {
                const res = await makePayment({
                    tokenId: stripeToken.id,
                    amount:
                        cart.total >= 150
                            ? cart.total.toFixed(2)
                            : (cart.total + 9.95).toFixed(2),
                });
                const orderData = {
                    userId: currentUser.userId,
                    orderDate: formattedDate,
                    orderStatus: "Paid",
                    localPickup: 1,
                    orderAmount: res.data.amount,
                    comment: "",
                };
                const orderRes = await createOrder(orderData);
                cart.products.forEach((product) => {
                    createOrderDetails({
                        orderId: orderRes.data.insertId,
                        productId: product.productId,
                        quantity: product.quantity,
                        priceEach: product.price,
                        userId: currentUser.userId,
                    });
                });
                const { address, email, phone, name } =
                    res.data.billing_details;
                const billingDetails = {
                    orderId: orderRes.data.insertId,
                    userId: currentUser.userId,
                    name: name,
                    email: email,
                    phone: phone,
                    ...address,
                };
                await createOrderBillingDetails(billingDetails);
                handleEmptyCart();
                setIsSuccess(true);
                setIsFetching(false);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } catch (error) {
                console.log(error.response.data);
                setIsFetching(true);
            }
        };
        stripeToken && cart.total > 1 && makeRequest();
        // eslint-disable-next-line
    }, [stripeToken, navigate, cart.total]);

    return (
        <Container fluid="xl" className="cart position-relative p-2 p-md-4">
            <Breadcrumbs />
            <Row className="py-3">
                <Col md={8} className="cart-details py-3 mb-4">
                    <h2>YOUR CART</h2>
                    <Table className="text-center text-gray">
                        <thead>
                            <tr>
                                <th colSpan={2}>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th className="d-none d-md-table-cell">
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products[0]?.quantity > 0 ? (
                                cart.products.map((item) => (
                                    <CartItem
                                        key={item.productId}
                                        item={item}
                                        cart={cart}
                                        dispatch={dispatch}
                                        updateProductQuantity={
                                            updateProductQuantity
                                        }
                                        handleRemoveProduct={
                                            handleRemoveProduct
                                        }
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colspan={4} className="fs-5 py-3">
                                        Your cart is empty{" "}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-success" href="/products">
                            Continue Shopping
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={handleEmptyCart}
                        >
                            Empty Cart
                        </Button>
                    </div>
                </Col>
                <Col
                    md={4}
                    className="order-summary border rounded d-flex flex-column justify-content-start py-3 px-4"
                >
                    {isSuccess ? (
                        <SuccessDiv message="Your order has been placed, redirecting you to homepage now." />
                    ) : (
                        <>
                            <CartSummary cart={cart} />
                            {cart.total < 2000 ? (
                                <StripeCheckout
                                    name="Jack's Garden"
                                    image=""
                                    billingAddress
                                    shippingAddress
                                    description={`The total is $${
                                        cart.total >= 150
                                            ? cart.total
                                            : cart.total + 9.95
                                    }`}
                                    amount={
                                        cart.total >= 150
                                            ? cart.total * 100
                                            : (cart.total + 9.95) * 100
                                    }
                                    token={onToken}
                                    stripeKey={KEY}
                                ></StripeCheckout>
                            ) : (
                                <div className="text-danger py-3">
                                    The total amount per order cannot be over
                                    $2000, please split your order.
                                </div>
                            )}
                            <div className="border border-danger rounded-3 d-flex px-1 py-3 mt-3">
                                The payment can be tested with <br />
                                card number: 4242 4242 4242 4242 <br />& a
                                future date for expire date
                            </div>
                        </>
                    )}
                </Col>
            </Row>
            {isFetching && (
                <Modal show centered>
                    <Modal.Body>
                        We are processing your order, please do not close the
                        page.
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default Cart;
