import { useEffect } from "react";
import Slide from "./Slide";
import Categories from "./Categories/Categories";
import ProductList from "../ProductList/ProductList";
import Features from "./Features";

const Home = () => {
    // scroll to top when navigate to the page
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);
    return (
        <>
            <Slide />
            <Features />
            <Categories />
            {navigator.onLine ? (
                <ProductList cat="recommended" />
            ) : (
                <div className="container fluid-xl px-3 py-5 offline-div">
                    <p className="fs-5">
                        You're offline now, take a break and come back when your
                        network is back.
                    </p>
                </div>
            )}
        </>
    );
};

export default Home;
