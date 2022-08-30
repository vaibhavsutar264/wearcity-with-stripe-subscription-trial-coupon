import React, { Fragment, useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";

import "./ProductDetails.css";

import ReactStars from "react-rating-stars-component";

import { useSelector, useDispatch } from "react-redux";

import { getProductDetails, clearErrors, newReview } from "../../actions/productAction";

import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";



const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails //this is fetched from redux on website redux terminal as the data is fetched from backend we will take it by useSelector
    );

    const { success, error: reviewError } = useSelector(
        //here error is taken as review errror because above error from product details is comming so tjhis and taht error will be mixed and we cannot understand is it the product errror or review error and also error will occur for using same error name
        (state) => state.newReview
    );



    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        // value: product.ratings,
        // readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");



    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    //now make add to cart button handler

    const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added to Cart");
    }

    const submitReviewToggle =()=>{
        open ? setOpen(false) : setOpen(true);
        // it means if the button is open then on click toggle will be close and review will be submitted and 
    }

    const reviewSubmitHandler = ()=>{
        const myForm = new FormData();
        
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);

        //new review is the product action function to add by put request of new reviews
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review submitted");
            dispatch({type: NEW_REVIEW_RESET});
            //whatever yu define here need to keep in dependencies below
        }
        dispatch(getProductDetails(match.params.id));
        //this is the action function which we have imported
    }, [dispatch, match.params.id, error, alert, reviewError, success]);
    //this are the dependencies such as dispatch alert
    //first before doing html and putting or attaching data from state we need to send data in state by using useeffect and then after the data reaches in state of redux termainal we will fetch those data in html below
    // data is given in redux terminal by using actions functions

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {
                                    product.images &&
                                    product.images.map((item, i) => (
                                        <img src={item.url} key={item.url} alt={`${i} slide`} className="CarouselImage" />

                                    ))
                                }
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span>
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`Rs${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    status:
                       <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                                {/* here redcolor and greenColor is a class which is define in app.css */}
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className="submitReview">
                            {/* //by this the submit review toggleis set as close in dialog box below of reviews rating submitting */}
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">
                        Reviews
                    </h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open} 
                        //here open is the pre defined property of duialog and {open is the usestate functioning}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                            {/* <Button  color="primary">  */}
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* here we will use ternary operator is there is reviews from backend then provide it or else no review */}

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review} />)}

                        </div>
                    ) : (<p className="noReviews"> no reviews yet</p>)}
                </Fragment>)}
        </Fragment>
    )
}

export default ProductDetails;