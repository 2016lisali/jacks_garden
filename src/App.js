import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Announcement, BackToTopBtn, Cart, Footer, Home, Login, MyAccount, Navbar, Register, Product, Products } from './components/index.js';
import "./app.scss";
function App() {

  return (
    <BrowserRouter>
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/:id" exact element={<Product />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/products/:category" exact element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/search" exact element={<Products />} />
        <Route path="/account" exact element={<MyAccount />} />
      </Routes>
      <Footer />
      <BackToTopBtn />
    </BrowserRouter>
  );
}

export default App;
