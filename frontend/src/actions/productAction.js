import axios from "axios";
import { ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET,NEW_REVIEW_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,NEW_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,  DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,NEW_PRODUCT_FAIL,    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET, CLEAR_ERRORS } from "../constants/productConstants";

export const getProduct = (keyword="",currentPage=1,price=[0,25000], category,ratings=0) => async (dispatch)=>{
    //here dispatch means recieve all data from backend and dispatch those in frontend
    //above keyword argument is passed for searching the products and to receiving the data from backend such as price
    try {
       //this function is used to collect data from backend so in order to collect data from backend through redux method use dispatch function for proper request and success and error functioning by product reducers 
        dispatch({ type: ALL_PRODUCT_REQUEST });

        // we will take a req from backend for collecting the products data collect it by all product request and by using axios below with the data get method url route
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        //by this way u can also serach the products

        // now for different url for categories filter products based on category of profduct
        if (category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }


        const { data } = await axios.get(link);
        console.log(data);

        // now if u get the data from backend then use all product success and take data from backend by paload:data

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data, 
            //see the getproduct reducer over there action.payload.product is written means it is action.data.product means product data is saved in redux store
            //payload means send the data in store whatever u get in url send that in store here products is stored in redux store after the products have stored in mongodb too basically redux store shows the data which we stored in backend
            //payload is linked with productscontroller res
            //here data from backend is collected now this data to be attach to component or a div
        });
        
    } catch (error) {
        // const { data } = await axios.get("/api/v1/products");
         //now if u were not able to collect the data from backend then make all product fail to check what is te error occuring by using payload err.response.data.message
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
        
    }

    // after this we need to make a function to trigger this function
};

//create Product 
export const createProduct = (productData) => async (dispatch)=>{
    try {
       //this function is used to collect data from backend so in order to collect data from backend through redux method use dispatch function for proper request and success and error functioning by product reducers 
        dispatch({ type: NEW_PRODUCT_REQUEST });

        // we will take a req from backend for collecting the products data collect it by all product request and by using axios below with the data get method url route

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);
        //review data is the the rating productId and comment from req.body see prodyuct controller createreview
        // console.log(data);

        // now if u get the data from backend then use all product success and take data from backend by paload:data

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
            //here only data is sent because in reducer for success has two payloads success and product
            //payload is linked with productscontroller res 
            //here data from backend is collected now this data to be attach to component or a div
        });
        
    } catch (error) {
        // const { data } = await axios.get("/api/v1/products");
         //now if u were not able to collect the data from backend then make all product fail to check what is te error occuring by using payload err.response.data.message
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
        
    }

    // after this we need to make a function to trigger this function
};


// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


export const getProductDetails = (id) => async (dispatch)=>{
    try {
       //this function is used to collect data from backend so in order to collect data from backend through redux method use dispatch function for proper request and success and error functioning by product reducers 
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // we will take a req from backend for collecting the products data collect it by all product request and by using axios below with the data get method url route

        const { data } = await axios.get(`/api/v1/product/${id}`);
        console.log(data);

        // now if u get the data from backend then use all product success and take data from backend by paload:data

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
            //for get method send data.product in payload and payload has success type of dta for put and delete req only

            //payload is linked with productscontroller res 
            //here data from backend is collected now this data to be attach to component or a div
        });
        
    } catch (error) {
        // const { data } = await axios.get("/api/v1/products");
         //now if u were not able to collect the data from backend then make all product fail to check what is te error occuring by using payload err.response.data.message
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        
    }

    // after this we need to make a function to trigger this function
};

//Review 
export const newReview = (reviewData) => async (dispatch)=>{
    try {
       //this function is used to collect data from backend so in order to collect data from backend through redux method use dispatch function for proper request and success and error functioning by product reducers 
        dispatch({ type: NEW_REVIEW_REQUEST });

        // we will take a req from backend for collecting the products data collect it by all product request and by using axios below with the data get method url route

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        //review data is the the rating productId and comment from req.body see prodyuct controller createreview
        // console.log(data);

        // now if u get the data from backend then use all product success and take data from backend by paload:data

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
            //payload is linked with productscontroller res 
            //here data from backend is collected now this data to be attach to component or a div
        });
        
    } catch (error) {
        // const { data } = await axios.get("/api/v1/products");
         //now if u were not able to collect the data from backend then make all product fail to check what is te error occuring by using payload err.response.data.message
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
        
    }

    // after this we need to make a function to trigger this function
};


//All Reviews of a product-- Admin
export const getAllReviews = (id) => async (dispatch)=>{
    try {

        dispatch({ type: ALL_REVIEW_REQUEST });

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
            //payload is linked with productscontroller res 
            //here data from backend is collected now this data to be attach to component or a div
        });
        
    } catch (error) {
        // const { data } = await axios.get("/api/v1/products");
         //now if u were not able to collect the data from backend then make all product fail to check what is te error occuring by using payload err.response.data.message
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
        
    }

    // after this we need to make a function to trigger this function
};


// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// All prodcuts == Admin
export const getAdminProduct = () => async (dispatch)=>{
    try {
        dispatch({type: ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get("/api/v1/admin/products");

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products, 
            //payload means send the data in store whatever u get in url send that in store here products is stored in redux store after the products have stored in mongodb too basically redux store shows the data which we stored in backend
        });
        
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });

        
    }
}

//now for making errors as null clearing errors
export const clearErrors = () => async (dispatch)=>{

    dispatch({ type: CLEAR_ERRORS });


}