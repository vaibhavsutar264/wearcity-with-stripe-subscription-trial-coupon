import React from 'react';
import "./CartItemCard.css";
import {Link} from "react-router-dom";

const CartItemCard = ({ item,deleteCartItems }) => {
    // deletecartitems is just a prop which carry a function
    return (
        <div className="CartItemCard">
        <img src={item.image} alt="ssa"/> 
        <div>
            <Link to={`/product/${item.product}`}> {item.name} </Link>
            {/* //link of item product is the id saved in product */}
            <span>{`Price: Rs${item.price}`}</span>
            <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
        </div>          
        </div>
    )
}

export default CartItemCard
