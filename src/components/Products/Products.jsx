import { useLocation } from "react-router-dom";
import ProductList from "../ProductList/ProductList";

const Products = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const searchQuery = location.search?.split("=")[1];

    return <ProductList cat={cat} searchQuery={searchQuery} />;
};

export default Products;
