import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import { Link } from "react-router-dom";
// import Header from "./Header";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
// import ProductCard from "./ProductCard";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
//to use above getProduct and clearErrors u need to import redux function such as useselector and usedispatch
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// const product = {
//   name: "Blue Tshirt",
//   images: [{ url:"https://i.ibb.co/DRST11n/1.webp"}],
//   price:"3000",
//   _id:"abhishek",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  //this products is taken from store.js file which is products actions part 

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          {/* <Header /> */}

          <div className="banner">
          <video
                    id="scroll-video"
                    src={
                        "./bg-video.mp4"
                    }
                    type="video/mp4"
                    autoPlay
                    muted
                    loop
                ></video>
                <div className='content'>
            <h2>Welcome to WearCity</h2>
            <Link to="/Products">
            <button className="Shop-Now-button">Shop Now</button>
            </Link>
            <h2>FIND FEATURED PRODUCTS BELOW</h2>
            </div>
          </div>
          
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
              
          {products && products.map((product)=>
          //here products && means if there are products then do products.map
          //above products is taken from redux terminal state panel , in redux terminal there is products array so in this that array is fetched
          <ProductCard product={product} />)}
          {/* in product component state panel array products is attached */}

              {/* <ProductCard product = {product}/> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
