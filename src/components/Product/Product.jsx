import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Container, Col, Image, Row } from "react-bootstrap";
import { Cart3, Dash, Plus } from "react-bootstrap-icons";
import {
    getCartDetails,
    addProductToCart,
    updateProductQuantity,
} from "../../actions/cartAction";
import { Breadcrumbs, SpinnerDiv } from "../index.js";
import RecommendProduct from "../ProductList/Product";
import { getProductById, getProductBySearch } from "../../api/api";

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [recommendProducts, setRecommendProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const URL = process.env.REACT_APP_BASE_URL;
    const currentUser = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname.split("/");
    const productId = currentPath[currentPath.length - 1];

    useEffect(() => {
        // scroll to top when navigate to the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        const getProduct = async () => {
            try {
                const res = await getProductById(productId);
                res.data.length > 0
                    ? setProduct(res.data[0])
                    : setProduct(null);
                const recProducts = await getProductBySearch(
                    null,
                    res?.data[0].category
                );
                recProducts.data.length > 0 &&
                    setRecommendProducts(recProducts.data.slice(0, 4));
            } catch (error) {
                setProduct(null);
                console.log(error);
            }
        };
        getProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        setIsFetching(true);
        try {
            if (currentUser) {
                if (!isProductInCart) {
                    await addProductToCart(
                        {
                            userId: currentUser.userId,
                            cartId: cart.cartId,
                            productId: product.productId,
                            price: product.price,
                            quantity,
                        },
                        dispatch
                    );
                } else {
                    quantity + quantityInCart <= 10
                        ? await updateProductQuantity(
                              {
                                  userId: currentUser.userId,
                                  cartId: cart.cartId,
                                  productId: product.productId,
                                  quantity: quantity + quantityInCart,
                              },
                              dispatch
                          )
                        : alert(
                              `The maximum amount per order is 10,there is already ${quantityInCart} in your shopping cart`
                          );
                }
                setIsFetching(false);
                setIsSuccess(true);
            } else {
                setIsFetching(false);
                alert("Please login first.");
            }
        } catch (error) {
            console.log(error);
            setIsFetching(false);
            setIsSuccess(false);
        }
    };

    useEffect(() => {
        currentUser?.userId && getCartDetails(currentUser?.userId, dispatch);
        product &&
            setIsProductInCart(
                cart.products.some(
                    (item) => item.productId === product.productId
                )
            );
        cart.products.forEach((item) => {
            item.productId === product?.productId &&
                setQuantityInCart(item.quantity);
        });
        // eslint-disable-next-line
    }, [dispatch, product, cart.total]);

    const handleQuantity = (type) => {
        if (type === "des") {
            quantity > 1 && setQuantity((prevValue) => prevValue - 1);
        } else {
            quantity < 10
                ? setQuantity((prevValue) => prevValue + 1)
                : alert("max amount is 10 per order");
        }
    };

    return (
        <Container
            fluid="xl"
            className="product-container position-relative py-4"
        >
            <Breadcrumbs />
            {!product ? (
                <div className="w-100 p-3 d-flex justify-content-center align-items-center">
                    Product does not exist
                </div>
            ) : (
                <Row className="py-4">
                    <Col sm={6} className="img-col p-3">
                        <Image
                            src={`${URL}${product?.productImage}`}
                            className="w-100"
                            alt={product?.productName}
                        />
                    </Col>
                    <Col
                        as="div"
                        sm={6}
                        className="info d-flex flex-column justity-content-between p-3"
                    >
                        <h2 className="mb-4">{product?.productName}</h2>
                        <p>{product?.productDescription}</p>
                        <p className="price fw-bold fs-3">$ {product?.price}</p>
                        <div className="amount-container">
                            <Dash
                                size="30px"
                                onClick={() => handleQuantity("des")}
                            />
                            <p className="quantity d-inline-flex justify-content-center align-items-center border border-success rounded-3 mx-1">
                                {quantity}
                            </p>
                            <Plus
                                size="30px"
                                onClick={() => handleQuantity("inc")}
                            />
                        </div>
                        <Button
                            variant="outline-success mt-3"
                            onClick={handleAddToCart}
                        >
                            {isFetching && <SpinnerDiv />}
                            {!isFetching && !isSuccess && (
                                <>
                                    <Cart3 /> ADD TO CART
                                </>
                            )}
                            {isSuccess && <>ADDED</>}
                        </Button>
                    </Col>
                    {Object.keys(product).length === 0 && (
                        <div className="w-100 h-100 position-absolute top-0 start-0 bg-light d-flex justify-content-center align-items-center py-5">
                            <SpinnerDiv />
                        </div>
                    )}
                </Row>
            )}
            <Row className="pe-lg-5 me-lg-5">
                <h5 className="text-secondary">You may also like</h5>
                {recommendProducts.map((product) => (
                    <RecommendProduct product={product} />
                ))}
            </Row>
        </Container>
    );
};

export default Product;
