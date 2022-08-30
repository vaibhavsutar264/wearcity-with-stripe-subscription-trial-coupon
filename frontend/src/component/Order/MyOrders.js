import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    //here flex 1 means to set the weidth of this id with respect to all other element in a row greater as id has more length than others therefore other element given less space width
    //here id is the orders id which is item._id see below filed value is set below by using rows.push method
    // also field is like an input tag , default type of id feild is number same fro status it is text and soo on

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        //cellclassname is used to give class to a certain value and this cellclassname is the predefined function of the datagrid for providing classes to cells
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
          //it means if status is delivered then show delivered text in green color otherwise red color for pending or processing this greencolor is the classname and 
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        //here renderCell is the predefined function of columns in datagrid and it used to store a js function in the cell and also it has a getvalue function whic is used to get the values of any other row cell 
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
          // by this u will redirect to oder id orderdetails page
        );
      },
    },
  ];
  const rows = [];

  // by this u have taken orders object vakues by using useselecter from redux terminal and putted those values in column and rows and after for keeping it in this table u used dispatch myorders below by ueseffect 

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
    //this is the orderaction function which we have imported  myorders dispatch we need to dispatch this function 
  }, [dispatch, alert, error]);
  //this are the dependencies such as dispatch alert

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            //means 10 rows 
            disableSelectionOnClick
            // means u cannot click on any value 
            className="myOrdersTable"
            autoHeight
            //auto height is given to set the height of each row automatically
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;