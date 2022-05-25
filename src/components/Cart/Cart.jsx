import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout"
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { createOrder, createOrderDetails, makePayment, createOrderBillingDetails } from "../../api/api";
import { updateProductQuantity, removeProductFromCart, emptyShoppingCart } from "../../actions/cartAction";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import SuccessDiv from "../SuccessDiv";
import Breadcrumbs from "../Breadcrumbs";

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const currentUser = useSelector(state => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveProduct = (data) => {
    removeProductFromCart(data, dispatch)
  };
  const handleEmptyCart = () => {
    emptyShoppingCart(cart.cartId, dispatch)
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
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const res = await makePayment({
          tokenId: stripeToken.id,
          amount: (cart.total >= 150) ? cart.total.toFixed(2) : (cart.total + 9.95).toFixed(2),
        });
        const orderData = ({
          userId: currentUser.userId,
          orderDate: formattedDate,
          orderStatus: "Paid",
          localPickup: 1,
          orderAmount: res.data.amount,
          comment: "",
        });
        const orderRes = await createOrder(orderData);
        cart.products.forEach(product => {
          createOrderDetails({ orderId: orderRes.data.insertId, productId: product.productId, quantity: product.quantity, priceEach: product.price })
        });
        const { address, email, phone, name } = res.data.billing_details;
        const billingDetails = { orderId: orderRes.data.insertId, name: name, email: email, phone: phone, ...address }
        console.log("billingDetails", billingDetails);
        await createOrderBillingDetails(billingDetails);
        setIsSuccess(true);
        handleEmptyCart();
        setTimeout(() => {
          navigate("/")
        }, 3000);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    stripeToken && cart.total > 1 && makeRequest();
    // eslint-disable-next-line
  }, [stripeToken, navigate, cart.total]);

  return (
    <Container fluid="xl" className="cart p-4">
      <Breadcrumbs />
      <Row>
        <Col md={8} className="cart-details py-3 mb-4">
          <h2>YOUR CART</h2>
          <Table className="text-center text-gray">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.products[0]?.quantity > 0 ? cart.products.map(item => (
                <CartItem key={item.productId} item={item} cart={cart} dispatch={dispatch} updateProductQuantity={updateProductQuantity} handleRemoveProduct={handleRemoveProduct} />
              )) : <tr><td className="fs-5 py-3">Your cart is empty </td></tr>}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button variant="outline-success" href="/products" >Continue Shopping</Button>
            <Button variant="outline-secondary" onClick={handleEmptyCart}>Empty Cart</Button>
          </div>
        </Col>
        <Col md={4} className="order-summary border rounded d-flex flex-column justify-content-between py-3 px-4">
          {isSuccess ? <SuccessDiv message="Your order has been placed, redirecting you to homepage now." /> : <>
            <CartSummary cart={cart} />
            <StripeCheckout
              name="Jack's Garden"
              image=""
              billingAddress
              shippingAddress
              description={`The total is $${(cart.total >= 150) ? cart.total : (cart.total + 9.95)}`}
              amount={(cart.total >= 150) ? cart.total * 100 : (cart.total + 9.95) * 100}
              token={onToken}
              stripeKey={KEY}
            >
            </StripeCheckout>
          </>}
        </Col>
      </Row>
    </Container>
  )
}

export default Cart;