import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartId: 0,
        products: [],
        quantityInCart: 0,
        total: 0,
    },
    reducers: {
        getCart: (state, action) => {
            state.cartId = action.payload.cartId;
            state.products = action.payload.products;
            state.quantityInCart = action.payload.quantityInCart;
            state.total = action.payload.total;
        },
        addProduct: (state, action) => {
            state.products.push({
                productId: action.payload.productId,
                quantity: action.payload.quantity,
                price: action.payload.price,
            });
            state.quantityInCart += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
        },
        updateQuantity: (state, action) => {
            state.products.forEach((product) => {
                if (product.productId === action.payload.productId) {
                    state.total +=
                        product.price *
                        (action.payload.quantity - product.quantity);
                    state.quantityInCart +=
                        action.payload.quantity - product.quantity;
                    state.quantity = action.payload.quantity;
                }
            });
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.productId !== action.payload.productId
            );
            state.quantityInCart -= action.payload.quantity;
        },
        emptyCart: (state) => {
            state.products = [];
            state.quantityInCart = 0;
            state.total = 0;
        },
    },
});

export const { getCart, addProduct, updateQuantity, removeProduct, emptyCart } =
    cartSlice.actions;
export default cartSlice.reducer;
