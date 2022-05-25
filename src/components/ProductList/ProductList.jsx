import { useState, useEffect } from "react";
import { Container, Col, Form, Row } from "react-bootstrap";
import { getAllProducts, getProductBySearch } from "../../api/api.js";
import Product from "./Product";
import SpinnerDiv from "../SpinnerDiv";
import Breadcrumbs from "../Breadcrumbs"

const ProductList = ({ cat, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [isFetching, setIsFetching] = useState()

  const handleSort = (e) => {
    const value = e.target.value
    console.log(products);
    switch (value) {
      case "price_low":
        setProducts([...products.sort((a, b) => a.price - b.price)]);
        break;
      case "price_high":
        setProducts([...products.sort((a, b) => b.price - a.price)]);
        break;
      case "latest":
        setProducts([...products.sort((a, b) => a.productId - b.productId)]);
        break;
      default:
        setProducts(products)
    }
  }

  useEffect(() => {
    switch (cat) {
      case "indoor":
        setTitle("Indoor Plants");
        break;
      case "outdoor":
        setTitle("Outdoor Plants")
        break
      case "fruittree":
        setTitle("Fruit Trees");
        break;
      case "recommended":
        setTitle("Recommended Product")
        break;
      default:
        setTitle("All Plants");
    }
    const getProducts = async () => {
      try {
        setIsFetching(true)
        let res;
        if (cat === "indoor" || cat === "outdoor" || cat === "fruittree") {
          res = await getProductBySearch(null, cat);
          const navLink = document.getElementById(cat)
          navLink.classList.add("active");
        } else if (cat === "search" && searchQuery) {
          setTitle(`Search results for "${searchQuery}"`)
          res = await getProductBySearch(searchQuery, cat)
        }
        else {
          res = await getAllProducts();
        }
        cat === "recommended" ? setProducts(res?.data.slice(0, 4)) : setProducts(res?.data)
        setIsFetching(false)
      } catch (error) {
        setIsFetching(false)
        setTitle(error.response ? error.response?.data : `Something went wrong, please try later.`)
        setProducts([])
      }
    }
    getProducts();
  }, [cat, searchQuery])
  console.log(products);
  return (
    <Container fluid="xl" className="productList-container px-0 py-4">
      <Breadcrumbs />
      <div className="d-flex justify-content-between align-items-center px-2">
        <h3 className="px-1 my-0 fw-bold">{title}</h3>
        <Form.Select size="sm" style={{ width: "100px" }} onChange={handleSort}>
          <option value="all">sort</option>
          <option value="price_low">price (low to high)</option>
          <option value="price_high">price (high to low)</option>
          <option value="latest">latest</option>
        </Form.Select>
      </div>
      {isFetching ?
        <SpinnerDiv /> :
        (<Row className="mx-0">
          {products.map(product => (
            <Product product={product} key={product.productId} />
          ))}</Row>)}
    </Container>
  )
}

export default ProductList;