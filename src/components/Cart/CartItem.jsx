import { Dash, Plus, Trash } from "react-bootstrap-icons";
import { Image } from 'react-bootstrap';

const CartItem = ({ cart, dispatch, item, updateProductQuantity, handleRemoveProduct }) => {
  const URL = process.env.REACT_APP_BASE_URL;
  return (
    <tr key={item.productId}>
      <td><Image src={URL + item.image} style={{ width: "60px" }} /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>
        <Dash size="25px"
          onClick={() =>
            item.quantity > 1 && updateProductQuantity({
              quantity: item.quantity - 1,
              cartId: cart.cartId,
              productId: item.productId
            }, dispatch)} />
        {item.quantity}
        <Plus size="25px" onClick={() =>
          updateProductQuantity({
            quantity: item.quantity + 1,
            cartId: cart.cartId,
            productId: item.productId
          }, dispatch)} />
      </td>
      <td>$ {item.price * item.quantity}
        <br />
        <Trash
          className="mt-2"
          onClick={() =>
            handleRemoveProduct({
              cartId: cart.cartId,
              productId: item.productId,
              quantity: item.quantity
            })} />
      </td>
    </tr>
  )
}

export default CartItem;