import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getAllProducts, getProductBySearch } from "../../api/api.js";
import Product from "./Product";
import SpinnerDiv from "../SpinnerDiv";

const ProductList = ({ cat, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [isFetching, setIsFetching] = useState()

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
        console.log(res.data);
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
      <h3 className="px-1 mt-4 fw-bold">{title}</h3>
      {isFetching ?
        <SpinnerDiv /> :
        (<Row className="mx-0">{products.map(product => (
          <Product product={product} key={product.productId} />
        ))}</Row>)}
    </Container>
  )
}

export default ProductList;