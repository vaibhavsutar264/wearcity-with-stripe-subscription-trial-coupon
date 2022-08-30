import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";
import axios from "axios"


export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({ type: ADD_TO_CART, 
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            },
        });
        //payload is linked with productcontroller res

        //Now this data is saved in state but as soon as page reloads the data gets deleted and to avoid this and to keep this data into ur registery we will store this data in localstorage by setitem and by get state method of local storage it will take the state from redux terminal which is have cart and in cart it has cartItems

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        //u need to pass the getState as an argument in arroe function as passed above
        // by this the data is saved in string format in local storage further we will use it as in object form by using the JSON.parse method



    }


    export const removeItemsFromCart = (id) => async (dispatch, getState) => {

        dispatch({ type: REMOVE_CART_ITEM, 
            payload: id,
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));



    }


    export const saveShippingInfo = (data) => async (dispatch) => {

        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
        });

        localStorage.setItem("shippingInfo" , JSON.stringify(data));
        //by this all the shipping data will be store in local storage
    }

