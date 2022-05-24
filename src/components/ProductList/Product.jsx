import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Product = ({ product }) => {
  const URL = process.env.REACT_APP_BASE_URL;
  return (
    <Col xs={6} md={3} className="img-col p-2" key={product.productId}>
      <div className="img-container mb-3">
        <Image src={URL + product.productImage} className="rounded w-100" alt={product.productName} />
        <Link to={`/product/${product.productId}`} state={product} alt="link to product page">
          <div className="overlay d-flex align-items-center justify-content-center">
            <Search color="white" size="30px" alt="link to product page" />
          </div>
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center px-1">
        <h5>{product.productName} <span className="fw-bolder">$ {product.price}</span></h5>
      </div>
    </Col>
  )
}

export default Product;

