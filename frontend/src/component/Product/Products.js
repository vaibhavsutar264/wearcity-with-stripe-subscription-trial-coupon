import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import SLider from "@material-ui/core/Slider"; //for price filter with sliding
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import MetaData from "../layout/MetaData";

const categories = [
    "Shirt",
    "T-shirt",
    "Casual pant",
    "Formal Pant",
    "Formal shirt",
];



const Products = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { products, loading, error, productsCount, resultPerPage, } = useSelector((state) => state.products);
    //this products is taken from store.js file which is linked with actions
    const keyword = match.params.keyword;
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          } //this error are backend data fetching error by using redux this are redux success req fail errors
        dispatch(getProduct(keyword, currentPage, price, category,ratings));
        //this is the action function which we have imported
    }, [dispatch, keyword, currentPage, price, category,ratings, alert, error])
    //this are the dependencies such as dispatch alert
      //first before doing html and putting or attaching data from state we need to send data in state by using useeffect and then after the data reaches in state of redux termainal we will fetch those data in html below
  // data is given in redux terminal by using actions functions
    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="PRODUCTS--ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                    <div className="filterBox">
                        <Typography> Price </Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                        <Typography> Categories </Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend"> Ratings Above </Typography>
                            <Slider
                                value={ratings}
                                valueLabelDisplay="auto"
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuos-slider"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < productsCount && (
                        //it means that is all the products are shown in a single page then do not provide a pagination suppose u wants to show 8 products in per page but ur total products is only8 then there should be no pagination as all products are shown in a single page                   
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>)}

                </Fragment>
            )}
        </Fragment>
    )
}

export default Products;
