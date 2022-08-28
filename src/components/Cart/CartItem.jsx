import { useSelector } from "react-redux";
import { Dash, Plus, Trash } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";

const CartItem = ({
    cart,
    dispatch,
    item,
    updateProductQuantity,
    handleRemoveProduct,
}) => {
    const URL = process.env.REACT_APP_BASE_URL;
    const currentUser = useSelector((state) => state.user.currentUser);
    const handleUpdateQuantity = (operation) => {
        if (operation === "inc") {
            if (item.quantity < 10) {
                updateProductQuantity(
                    {
                        userId: currentUser.userId,
                        quantity: item.quantity + 1,
                        cartId: cart.cartId,
                        productId: item.productId,
                    },
                    dispatch
                );
            } else {
                alert("max 10 per order");
            }
        } else if (operation === "dec") {
            if (item.quantity > 1) {
                updateProductQuantity(
                    {
                        quantity: item.quantity - 1,
                        cartId: cart.cartId,
                        productId: item.productId,
                    },
                    dispatch
                );
            }
        }
    };

    return (
        <tr key={item.productId}>
            <td className="px-0">
                <Trash
                    className="me-1"
                    onClick={() =>
                        handleRemoveProduct({
                            userId: currentUser.userId,
                            cartId: cart.cartId,
                            productId: item.productId,
                            quantity: item.quantity,
                        })
                    }
                />
                <Image src={URL + item.image} style={{ width: "60px" }} />
            </td>
            <td>{item.productName}</td>
            <td>${item.price}</td>
            <td>
                <Dash size="25px" onClick={() => handleUpdateQuantity("dec")} />
                {item.quantity}
                <Plus size="25px" onClick={() => handleUpdateQuantity("inc")} />
            </td>
            <td className="d-none d-md-table-cell">
                $ {item.price * item.quantity}
            </td>
        </tr>
    );
};
export default CartItem;
