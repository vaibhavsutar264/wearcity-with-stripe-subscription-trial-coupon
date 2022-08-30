import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, productsReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer} from "./reducers/cartReducer"
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from "./reducers/orderReducer"


const reducer = combineReducers({
    //here combine reducers is taken because lots of product reducers will be there of different type of product
   products: productsReducer,
   //this reducer name as products will be shown in redx store
   product: productReducer,
   productDetails: productDetailsReducer,
   user: userReducer,
   profile: profileReducer,
   forgotPassword: forgotPasswordReducer,
   cart: cartReducer,
   newOrder: newOrderReducer,
   myOrders: myOrdersReducer,
   orderDetails: orderDetailsReducer,
   newReview:newReviewReducer,
   newProduct: newProductReducer,
   allOrders: allOrdersReducer,
   order: orderReducer,
   allUsers:allUsersReducer,
   userDetails: userDetailsReducer,
   productReviews:productReviewsReducer,
   review:reviewReducer,

   //here user reducers is attached which is link in app.js and useraction is attached components loginsignup or product.js and product.js is attached im app.js , store js is attached in index.js
    
});

let initialState = {
    //here we cannot keep initial state of cart as empty as whenever user click on add to cart the data of user product is saving in localstorage so if we keep initial state as empty then local storage data will be erased so in order to keep those data in initial state by get method of local storage which will take data from local storage and save in initial state because in local storage data is saved by setitem method

    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : [],

        //above statement is a ternary operator in which is there is data in local storage then convert it in object from by JSON.parse use and take that data and if there is no data the pass empty array as [] as shown above now after taking this data u need to work this on add to cart button 
    }


};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,   
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store