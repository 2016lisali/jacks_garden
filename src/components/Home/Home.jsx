import Slide from "./Slide";
import Categories from "./Categories/Categories";
import ProductList from "../ProductList/ProductList";
import Features from "./Features";

const Home = () => {
  return (
    <>
      <Slide />
      <Features />
      <Categories />
      {navigator.onLine ?
        <ProductList cat="recommended" /> :
        <div className="container fluid-xl px-3 py-5 offline-div">
          <p className="fs-5">You're offline now, back to shopping when your network back.
            Enjoy shopping!</p>
        </div>}
    </>
  )
}

export default Home;