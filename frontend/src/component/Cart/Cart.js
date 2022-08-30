import React, { Fragment } from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { Typography } from '@material-ui/core';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = ({history}) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id,quantity,stock)=>{
        const newQty = quantity + 1;
        if(stock <= quantity){
            //it means that quantity exceeds more than stock then do nothing
            return;
        }
        // and if u increasing quantity and if there are that much stock after ur increase then dispatch new qty
        dispatch(addItemsToCart(id,newQty));

    }


    const decreaseQuantity = (id,quantity)=>{
        const newQty = quantity - 1;
        if(1 >= quantity){
            //it means that if qty is less that 1 then return nothing 
            return;
        }
        // and if u decreasing quantity when its qty is more than one then this function is applicable
        dispatch(addItemsToCart(id,newQty));

    }

    const deleteCartItems = (id) =>{
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    }


    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">

                <RemoveShoppingCartIcon/>

                <Typography> No Product In Your Cart </Typography>
                <Link to= "/products"> View Products</Link>
                
                </div>
            ): (<Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {cartItems && cartItems.map((item) => (
                    //map function has a bracket not a curly bracket
                    <div className="cartContainer" key={item.product}>
                    {/* //key is required when u are using map function */}
                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                        <div className="cartInput">
                            <button onClick= {() => decreaseQuantity(item.product, item.quantity)}>-</button>
                            <input type="number" readOnly value={item.quantity} />
                            <button onClick= {() => increaseQuantity(item.product, item.quantity,item.stock)}>+</button>
                        </div>
                        <p className="cartSubtotal">{`Rs${item.price * item.quantity}`}</p>
                    </div>
                ))}

                <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Total</p>
                        <p>{`Rs${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,0
                            // here acc is accumulator is used to send the array value in series and reduce is a function to be executed for each and every array
                        )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                    <button onClick={ checkoutHandler } >Check Out</button>                   
                    </div>
                </div>
            </div>
        </Fragment>)}
        </Fragment>

    )
}

export default Cart
