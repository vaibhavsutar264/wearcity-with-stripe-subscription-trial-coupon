import './App.css';
import Header from "./component/layout/Header/Header.js"
import Navbar from './component/hambergermenu/Navbar';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home"
import {BrowserRouter as Router, Switch,  Route} from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState , useEffect } from "react";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import About from './component/About/About';
import Contact from "./more/Contact";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser, updatePassword } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import ProtectedRoute from './component/Route/ProtectedRoute';
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import NotFound from "./component/layout/NotFound/NotFound";


function App() {

  const { isAuthenticated, user} = useSelector((state)=> state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }



  useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })

    store.dispatch(loadUser()); //by this if u go on login page it will automatically redirect u to account page as u were got logged in because of user data present in state of redux
    //by this way also u can dispatch load user instead of dispatching it from component folder

    getStripeApiKey();
  },[]);

  // window.addEventListener("contextmenu", (e)=> e.preventDefault());
  //this statement says that if there is any default setting for developer is there then if u want to hide or disfunction it then to all website select by context menu and remove all default by e.prevent default by this no one can right click and check the inspect and console and everything
  return (
    <Router>
      <Navbar />
    {/* <Header/> //this header is from layout  */}
    {/* // <Routes> */}
    { isAuthenticated && <UserOptions user={user}/>}

    {stripeApiKey && 
    <Elements stripe={loadStripe(stripeApiKey)}>
    <ProtectedRoute exact path='/process/payment' component={Payment} />
    </Elements>
    } 
    {/* //this condition type of elements for stripe and for useroption should be kept outside of switch only */}


    <Switch>
    <Route exact path='/' component={Home} />
    {/* give exact to only those routes who do not have change in url and below without exact url has keyword as id so its url is not constant it will keeps on changing so it has not provided exact */}
    <Route exact path='/product/:id' component={ProductDetails} />
    <Route exact path='/products' component={Products} />
    <Route path='/products/:keyword' component={Products} />
    <Route exact path='/search' component={Search} />
    <Route exact path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
    <ProtectedRoute exact path='/account' component={Profile} />
    <ProtectedRoute exact path='/me/update' component={UpdateProfile} /> 
    <ProtectedRoute exact path='/password/update' component={UpdatePassword} /> 
    <Route exact path='/password/forgot' component={ForgotPassword} /> 
    <Route exact path='/password/reset/:token' component={ResetPassword} /> 
    {/* //here update profile u is taken capital because in the useraction update profile action has u small if u take small u in this also as a component of frontend then site will be crash */}
    <Route exact path='/login' component={LoginSignUp} />
    <Route exact path='/cart' component={Cart} />
    <ProtectedRoute exact path='/shipping' component={Shipping} />
    <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />
    <ProtectedRoute exact path='/success' component={OrderSuccess} />
    <ProtectedRoute exact path='/orders' component={MyOrders} />
    <ProtectedRoute exact path='/order/:id' component={OrderDetails} />
    <ProtectedRoute isAdmin={true} exact path='/admin/dashboard' component={Dashboard} />
    <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductList} />
    <ProtectedRoute isAdmin={true} exact path='/admin/product' component={NewProduct} />
    <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component={UpdateProduct} />
    <ProtectedRoute isAdmin={true} exact path='/admin/orders' component={OrderList} />
    <ProtectedRoute isAdmin={true} exact path='/admin/order/:id' component={ProcessOrder} />
    <ProtectedRoute isAdmin={true} exact path='/admin/users' component={UsersList} />
    <ProtectedRoute isAdmin={true} exact path='/admin/user/:id' component={UpdateUser} />
    <ProtectedRoute isAdmin={true} exact path='/admin/reviews' component={ProductReviews} />
    <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
            //here processpayment condition is checked and in this if in the website the url have localhost/process/payment then make this component as null means destroy this component and if the url is different than all url mentioned in switch and process payment then show notfound
          }
        />
    </Switch>
    {/* // </Routes> */}
    <Footer/>
    </Router>
  )
}

export default App;
