import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Announcement,
    BackToTopBtn,
    Cart,
    Footer,
    Home,
    Help,
    Login,
    MyAccount,
    Navbar,
    Register,
    Product,
    Products,
    NotFound,
} from "./components/index.js";
import "./app.scss";

function App() {
    return (
        <BrowserRouter>
            <Announcement />
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route
                    path="/products/:category/:id"
                    exact
                    element={<Product />}
                />
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" exact element={<Register />} />
                <Route
                    path="/products/:category"
                    exact
                    element={<Products />}
                />
                <Route path="/products" element={<Products />} />
                <Route path="/products/search" exact element={<Products />} />
                <Route path="/account" exact element={<MyAccount />} />
                <Route path="/help" exact element={<Help />} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            <Footer />
            <BackToTopBtn />
        </BrowserRouter>
    );
}

export default App;
