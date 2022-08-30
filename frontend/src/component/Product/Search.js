import React, {useState, Fragment} from 'react';
import "./Search.css";
import MetaData from '../layout/MetaData';

const Search = ({history}) => {

    const [keyword,setKeyword] = useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            //the function trim is used for checking if someone written on space in input field so to avoid this use trim
            history.push(`/products/${keyword}`);
            //here keyword is the thing which we search for and in suggestion which is occured and after clicking on it this search function history function will take you to products details page
            //for using history u need to pass argument in the main function wit curly bracket as we have passed in main search function
        } else {
            history.push("/products");
        }
    };
    return (
        <Fragment>
            <MetaData title={"Search-- ECOMMERCE"} />
            <form onSubmit={searchSubmitHandler} className="searchBox">
            <input type="text" placeholder="Search a product" onChange={(e) => setKeyword(e.target.value)}/>
            <input type="submit" value="Search"/>
            </form>
            
        </Fragment>
    )
}

export default Search;
