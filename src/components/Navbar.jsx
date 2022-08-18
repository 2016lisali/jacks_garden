import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useForm } from "react-hook-form";
import {
    Badge,
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Container,
    NavDropdown,
} from "react-bootstrap";
import { Cart3, PersonFill } from "react-bootstrap-icons";
import { emptyCart } from "../redux/cartReducer";
import { loginSuccess, logout } from "../redux/userReducer";
import { getCartDetails } from "../actions/cartAction";
import { deleteCookie } from "../api/api";

const TopNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);

    // check if users token is expired
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("jg_user"))?.user;
        if (user) {
            if (user.expires > new Date().toISOString()) {
                dispatch(
                    loginSuccess({
                        userId: user.userId,
                        firstName: user.firstName,
                        email: user.email,
                    })
                );
            } else {
                handleLogout();
            }
        }
    }, [location]);
    // check if darkmode in localStorage
    useEffect(() => {
        const darkmode = JSON.parse(localStorage.getItem("darkmode"));
        if (darkmode) {
            document.getElementById("custom-switch").checked = true;
            document.querySelector("html").classList.add("dark-theme");
        }
    }, []);
    // get Cart details
    useEffect(() => {
        user && getCartDetails(user?.userId, dispatch);
        // eslint-disable-next-line
    }, [user, cart.quantityInCart]); // delete dispatch

    const handleSearch = (data) => {
        console.log(data);
        navigate(`/products/search?productname=${data.search}`);
    };
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(emptyCart());
        navigate("/");
        try {
            const res = await deleteCookie();
            console.log("delete cookie res", res);
        } catch (error) {
            console.log("delete cookie error", error);
        }
    };
    const toggleDarkMode = (e) => {
        const rootElement = document.querySelector("html");
        let checkBox = document.getElementById("custom-switch");
        if (checkBox.checked) {
            rootElement.classList.add("dark-theme");
            localStorage.setItem("darkmode", "true");
        } else {
            rootElement.classList.remove("dark-theme");
            localStorage.removeItem("darkmode");
        }
    };

    return (
        <>
            <Navbar
                expand="lg"
                collapseOnSelect
                className="fixed-top shadow-sm"
            >
                <Container
                    fluid="xl"
                    className="nav-container d-flex align-items-lg-center justify-content-lg-between"
                >
                    <Navbar.Brand
                        href="/"
                        className="fw-bold fs-4 flex-fill me-0"
                    >
                        Jack's Garden
                    </Navbar.Brand>
                    <div className="d-flex align-items-center ms-2 order-lg-last">
                        <Form.Check
                            type="switch"
                            aria-label="dark mode"
                            id="custom-switch"
                            data-tip="dark mode"
                            className="text-end position-relative d-flex justify-content-center px-2 mx-0"
                            onChange={toggleDarkMode}
                        />
                        <ReactTooltip effect="solid" />
                        {!user ? (
                            <Button
                                variant="link"
                                href="/login"
                                className="px-2"
                                data-tip="Login/Register"
                                title="Link to login/register page"
                            >
                                <PersonFill
                                    size="20px"
                                    alt="link to the login/register page"
                                />
                                <span className="d-none">login page</span>
                            </Button>
                        ) : (
                            <NavDropdown
                                title={
                                    <PersonFill
                                        size="20px"
                                        alt="link to the login/register page"
                                    />
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    href="/account"
                                    className="small"
                                >
                                    MY ACCOUNT
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    className="small"
                                    onClick={handleLogout}
                                >
                                    LOG OUT
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <Button
                            variant="link"
                            href="/cart"
                            className="cart-icon d-flex align-items-center me-2"
                        >
                            <Cart3 alt="link to the cart page" />
                            <Badge
                                bg="dark"
                                className="d-flex justify-content-center
              position-absolute
               top-0
               end-0
               align-items-center
               rounded-circle
               "
                            >
                                {cart.quantityInCart}
                            </Badge>
                        </Button>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-lg-2 my-2 my-lg-0" navbarScroll>
                            <Nav.Link href="/products/indoor" id="indoor">
                                INDOOR PLANT
                            </Nav.Link>
                            <Nav.Link href="/products/outdoor" id="outdoor">
                                OUTDOOR PLANT
                            </Nav.Link>
                            <Nav.Link href="/products/fruittree" id="fruittree">
                                FRUIT TREES
                            </Nav.Link>
                        </Nav>
                        <Form
                            className="search-bar input-group ms-lg-auto me-lg-5 position-relative d-flex pb-2 pb-lg-0"
                            onSubmit={handleSubmit(handleSearch)}
                        >
                            <FormControl
                                type="text"
                                className="rounded-start"
                                placeholder="Search"
                                aria-label="Search"
                                name="search"
                                {...register("search", {
                                    required: "input cannot be null",
                                    maxLength: {
                                        value: 45,
                                        message: "Max length is 45",
                                    },
                                })}
                            />
                            <span className="search-error position-absolute text-danger">
                                {errors.search && errors.search.message}
                            </span>
                            <Button
                                type="submit"
                                variant="outline-success"
                                className="rounded-end"
                            >
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="w-100 d-block"></Container>
        </>
    );
};

export default TopNav;
