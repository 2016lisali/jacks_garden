const CartSummary = ({ cart }) => {
    return (
        <div className="d-flex flex-column justify-content-between p-3">
            <h2 className="py-2">ORDER SUMMARY</h2>
            <div className="d-flex justify-content-between py-2">
                <span>Subtotal</span>
                <span>$ {cart.total}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
                <span>Estimated Shipping</span>
                <span>$ 9.95</span>
            </div>
            <div className="d-flex justify-content-between py-2">
                <span>Shipping Discount</span>
                <span>$ {cart.total >= 150 ? -9.95 : 0}</span>
            </div>
            <div className="total-amount fs-3 fw-bolder">
                <span className="pe-2">Total</span>
                <span>
                    $ {cart.total >= 150 ? cart.total : cart.total + 9.95}{" "}
                </span>
            </div>
        </div>
    );
};

export default CartSummary;
