import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/api",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

//Auth API
export const login = (formData) => API.post("/users/login", formData);
export const registerUser = (formData) => API.post("/users/register", formData);
export const getUserById = (id) => API.get(`/users/${id}`);

// Mailing list API
export const addEmail = (data) => API.post("/users/emails", data);

// Upload product Img
export const uploadImg = (img) =>
    API.post("/uploadfiles", img, {
        headers: { "content-type": "multipart/form-data" },
    });

// Products API
export const getAllProducts = () => API.get("/products");
export const getProductBySearch = (productname, category) =>
    API.get(`/products/search?productname=${productname}&category=${category}`);
export const getProductById = (id) => API.get(`/products/${id}`);

// Cart API
export const createCart = (userId) => API.post(`/carts/?userId=${userId}`);
export const getCartDetailsByUserId = (userId) =>
    API.get(`/carts/search?userId=${userId}`);
export const addCartDetails = (formData) =>
    API.post("/carts/details", formData);
export const updateCartDetails = (data) =>
    API.patch(`/carts/${data.cartId}`, data);
export const deleteProductInCart = (data) =>
    API.delete(
        `/carts/${data.cartId}/product?productId=${data.productId}`,
        data
    );
export const emptyCart = (data) => API.delete(`/carts/${data.cartId}`, data);

// Payment and order API
export const makePayment = (data) => API.post("/checkout/payment", data);
export const createOrder = (data) => API.post("/orders", data);
export const createOrderDetails = (data) => API.post("/orders/details", data);
export const createOrderBillingDetails = (data) =>
    API.post("/orders/billings", data);
export const getOrderDetailsByUserId = (userId) =>
    API.get(`/orders/users/${userId}`);
export const getOrderDetailsByOrderId = (orderId) =>
    API.get(`/orders/${orderId}`);

// Cookies API
export const deleteCookie = () => API.delete("/cookies");
