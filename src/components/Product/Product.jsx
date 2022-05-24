import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Container, Col, Image, Row } from "react-bootstrap";
import { Cart3, Dash, Plus } from "react-bootstrap-icons";
import { getCartDetails, addProductToCart, updateProductQuantity } from "../../actions/cartAction";
import SpinnerDiv from "../SpinnerDiv";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const URL = process.env.REACT_APP_BASE_URL;
  const currentUser = useSelector(state => state.user.currentUser);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const product = location.state;

  // scroll to top when navigate to the page
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleAddToCart = async () => {
    setIsFetching(true);
    try {
      console.log(currentUser);
      if (currentUser) {
        console.log("here");
        if (!isProductInCart) {
          await addProductToCart({ cartId: cart.cartId, productId: product.productId, price: product.price, quantity }, dispatch)
        } else {
          await updateProductQuantity({ cartId: cart.cartId, productId: product.productId, quantity: quantity + quantityInCart }, dispatch)
        }
        setIsFetching(false);
        setIsSuccess(true);
      } else {
        setIsFetching(false)
        alert("Please login first.")
      };
    } catch (error) {
      console.log(error);
      setIsFetching(false);
      setIsSuccess(false);
    }

  };
  useEffect(() => {
    console.log("Use effect");
    currentUser?.userId && getCartDetails(currentUser?.userId, dispatch);
    setIsProductInCart(cart.products.some(item =>
      item.productId === product.productId
    ))
    cart.products.forEach(item => {
      item.productId === product.productId && setQuantityInCart(item.quantity)
    })
    // eslint-disable-next-line
  }, [dispatch, cart.total]);

  const handleQuantity = (type) => {
    if (type === "des") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }

  return (
    <Container fluid="xl" className="product-container">
      <Row className="py-4">
        <Col sm={6} className="img-col p-3">
          <Image src={`${URL}${product?.productImage}`} className="w-100" alt={product.productName} />
        </Col>
        <Col as="div" sm={6} className="info d-flex flex-column justity-content-between p-3">
          <h2 className="mb-4">{product.productName}</h2>
          <p>{product.productDescription}</p>
          <p className="price fw-bold fs-3">$ {product.price}</p>
          <div className="amount-container">
            <Dash size="30px" onClick={() => handleQuantity("des")} />
            <p className="quantity d-inline-flex justify-content-center align-items-center border border-success rounded-3 mx-1">{quantity}</p>
            <Plus size="30px" onClick={() => handleQuantity("inc")} />
          </div>
          <Button variant="outline-success mt-3" onClick={handleAddToCart}>
            {isFetching && <SpinnerDiv />}
            {(!isFetching && !isSuccess) && (<><Cart3 /> ADD TO CART</>)}
            {isSuccess && <>ADDED</>}
          </Button>
        </Col>
      </Row>
      {/* <Row>
        <h2>You may also like</h2>
        <ProductList cat={product.category} />
      </Row> */}
    </Container>
  )
}

export default Product;