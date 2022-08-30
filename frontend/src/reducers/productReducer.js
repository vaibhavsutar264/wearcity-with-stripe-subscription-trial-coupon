import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
  } from "../constants/productConstants";

//first of all in this section whatever is done in return() is showed on redux terminal so whatever return in parameter as products: or isdeleted : is jsust a name to get what does it says and value of it is created in actions file as productAction file
export const productsReducer = (state = { products: []}, action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[],
                //initially if we doesnt start the backend terminal or there is any error in redux terminal or redux store in state as products as productReducer is saved as products in store so basically redux termianl is a store which we created as store.js and imported in index file , then in store i.e redux terminal we will get result of products which is saved as productReducer as product:[] because no data found and only empty array will be shown 
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                // here payload means simply the value of payload saved in actions of same function so it can be only payload: data,then the above statement will be from products: action.payload.products to products: action.data.products,
                //here we got the data therfoe products in redux store will be saved 
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };   
        default:
            return state;
    }
    
};


export const productReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        //   here only action.payload is written but in product action its value is data.success so its complete value is action.data.success u can also keep the value in action as data only and write over here as isDeleted: action.payload.success, both can work same
          //here action is taken from product action and isdeleted is just a name which we show on redux terminal this all in return is shown on redux terminal 
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_PRODUCT_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const newProductReducer = (state = { product: {}}, action)=>{
    //above side state={} means initial state of state is empty which u can see if u doesnt on backend terminal then u see this product {} in reducx terminal
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
                //in productactions file payload of this new product has a value of data means it is action.data.success

            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };    
        default:
            return state;
    }   
};

export const productDetailsReducer = (state = { product: {}}, action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
    
        default:
            return state;
    }
    
};




//For reviews
export const newReviewReducer = (state = {}, action)=>{
    //above side state={} means initial state of state is empty
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
    
        default:
            return state;
    }
    
};


//All reviews--Admin
export const productReviewsReducer = (state = {reviews: [] }, action)=>{
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
    
        default:
            return state;
    }
    
};

//For review delete-- Admin
export const reviewReducer = (state = {}, action)=>{
    //above side state={} means initial state of state is empty
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isdeleted: action.payload,
            };

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isdeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
    
        default:
            return state;
    }
    
};