import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
// import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  // useselector select the data from redux terminal and fill in the page , useselector fills the data after we send the data from bavckend by using actions in frontend and that actions take data from backend and then import that action function in this file and by using use effect dispatch it or send the value menas dispatch is used to send the value in the redux termainal and simultaneosly useselector fill those backend data in the page

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  //getAllusers in useraction has a reducer as userreducer as name as allusersreducer now this reducer is stored in store with name as allUsers so the line state.allUsers is taking all data from reducer and reducer has a payload with action.data and this action is created in useraction with a functon name as getallusers so when u dispatch getallusers it automatically send data of users to userreducer and then userreducer data is saved in store as all users so this all susers data is saved in stae of redux store as allusers name 

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        //it means that if product has stock as 0 now after someone ordered the last piece of product while viewing in dashboard then simply make doughnut chart outofstack value as 1 or add a value of 1 if there is out of stock of 1 product as stated below , outof stock is the value of doughnut data and item.stock is the value of products in redux terminal data as state data
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
      //it is a graph of initial amount and total amount its a straight line graph in 45degree angle
    labels: ["Initial Amount", "Amount Earned"],
    // label has initial value at 0,0 amnd final value at the top right corner
    datasets: [
        //this are used to set or give data in a line graph
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
        //above has 2 values in doughnut i.e is outof stock and in products and total products - outof staock value
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        {/* <Typography component="h1">Dashboard</Typography> */}

        <div className="dashboardSummary">
          <div>
            <h2>
            Dashboard
            </h2>
          </div>
        </div>
          <div className="for-grid">
          <div className="dashboardSummaryBox2">
            {/* <div className="product-div"> */}
            <Link className="dashboardSummaryBox2-inner" to="/admin/products">
              <p className="product-p">{products && products.length}</p>
              <p className="product-p2">Products </p>
              </Link>
              {/* </div> */}
            <Link to="/admin/orders">
              <p className="orders-p">{orders && orders.length}</p>
              <p className="orders-p2">Orders </p>
            </Link>
            <Link to="/admin/users">
              <p className="users-p">{users && users.length}</p>
              <p className="users-p2">Users </p>
            </Link>
          </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        </div>
        <div>
            <p className="Amount">
              Total Amount <br /> {totalAmount}
            </p>
          </div>
          {/* //here line is a component and to give data in that component use data attribute */}

        {/* <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
        {/* //here doughnut is a component and to give data in that component use data attribute */}
      </div>
    </div>
  );
};

export default Dashboard;

