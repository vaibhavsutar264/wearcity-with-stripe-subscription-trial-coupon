import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [] }, action)=>{

    switch (action.type) {
        case ADD_TO_CART:
        const item = action.payload;
        //by this we will take the data from state and store in item 

        const isItemExist = state.cartItems.find(
            // isitem exist meas if there is same item in cart of the same user which he added previously then 
            (i) => i.product === item.product
            //here i.product is the id of product which user has added previously and item.product is the id of the product which user is adding at present
        )

        if (isItemExist){
            return {
                ...state,
                cartItems: state.cartItems.map((i)=>
                i.product === isItemExist.product ? item : i
            
            )
            } 
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems , item ],
            };
                
        }

        case REMOVE_CART_ITEM:
           return {
               ...state,
               cartItems: state.cartItems.filter((i)=> i.product !== action.payload),
               //here i.product is the id of product and the above statement says that if removing produt id is there in the cartitems then it should be not to be in action.payload which is the response res so it wiil remove product and keep remaining product
           }
        
           case SAVE_SHIPPING_INFO:
           return {
               ...state,
               shippingInfo: action.payload,
           }
    
        default:
            return state;
    }



}