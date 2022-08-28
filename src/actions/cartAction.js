import * as api from "../api/api.js";
import {
    getCart,
    addProduct,
    updateQuantity,
    removeProduct,
    emptyCart,
} from "../redux/cartReducer.js";

export const getCartDetails = async (userId, dispatch) => {
    try {
        const { data } = await api.getCartDetailsByUserId(userId);
        const products = [];
        let quantityInCart = 0;
        let total = 0;
        if (data[0])
            data.forEach((item) => {
                products.push({
                    productId: item.productId,
                    productName: item.productName,
                    image: item.productImage,
                    quantity: item.quantity,
                    price: item.price,
                });
                quantityInCart += item.quantity;
                total += item.price * item.quantity;
            });
        const cart = {
            cartId: data[0]?.cartId,
            products,
            quantityInCart,
            total,
        };
        dispatch(getCart(cart));
    } catch (error) {
        console.log(error.response?.data);
    }
};
export const addProductToCart = async (data, dispatch) => {
    try {
        await api.addCartDetails(data);
        dispatch(addProduct(data));
    } catch (error) {
        console.log(error);
    }
};

export const updateProductQuantity = async (data, dispatch) => {
    try {
        await api.updateCartDetails(data);
        dispatch(updateQuantity(data));
    } catch (error) {
        console.log(error);
    }
};

export const removeProductFromCart = async (data, dispatch) => {
    try {
        await api.deleteProductInCart(data);
        dispatch(removeProduct(data));
    } catch (error) {
        console.log(error);
    }
};

export const emptyShoppingCart = async (data, dispatch) => {
    try {
        await api.emptyCart(data);
        dispatch(emptyCart());
    } catch (error) {
        console.log(error);
    }
};
