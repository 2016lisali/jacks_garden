import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Product = ({ product }) => {
  const URL = process.env.REACT_APP_BASE_URL;
  return (
    <Col xs={6} md={3} className="img-col p-2" key={product.productId}>
      <div className="img-container mb-3">
        <Image src={URL + product.productImage} className="rounded w-100" alt={product.productName} />
        <Link to={`/products/${product.category}/${product.productId}`} state={product}>
          {/* <Link to={`/product/${product.productId}`} state={product}> */}
          <div className="overlay d-flex flex-column align-items-center justify-content-center">
            <Search color="white" size="30px" />
            <p>VIEW</p>
          </div>
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center px-1">
        <p>{product.productName}</p>
        <p className="fw-bolder text-end" id="productPrice" style={{ minWidth: "54px" }}>$ {product.price}</p>
      </div>
    </Col>
  )
}

export default Product;

