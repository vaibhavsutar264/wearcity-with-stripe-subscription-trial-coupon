import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  //whatever we were taking from state such as products or error is given a if else condition in useeffect hooke

  const { error: deleteError, isDeleted } = useSelector(
    //above error:deleteError simply meas that error of product is given a different name as deleteerror because above in products state there is also a error 
    (state) => state.product
    //here the useselector is taking the dta from redux store with respect to its success part
  );
  //whatever we were taking from state such as isDeleted,deleteError  or error is given a if else condition in useeffect hooke

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    //here id is passed because in the url of deleteproduct function has /id
  };

  useEffect(() => {

    // this useeffect is the hooke which is called after u click on a button or submit a form or onclick this functon is called 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    } 
    // it means after u click on a delete button if there is an error then by use effect u can show that error

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
      //here reset is called because it has isdeleted false means after deleting a product by using deleteproductsucccess this deleteproductsucccess should not work again and again and to stop this call delete product reset which has isdeleted: false 
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError,history,isDeleted ]);

  //by using useEffect we call the button function or onclick functions and send the data to store by dispatching its reducer funcction to redux terminal

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
                //here the value of id is given in id column of datagrid so this id is fetching from datagrid id by getvalue function of datagrid
                //this simple function is linked with backend product controller , productRoute, frontend , productreducer, productAction and store.js where productreducer is saved and store.js is called in index.js and product action is imported in this productlist file and in this deleteProductHandler the product action deleteProduct function is dispatched which has a remove function which removes selected product by its id of product as stated in productcontroller deleteproduct function
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
      {/* //here classname is set as dashboard because to set same sidebar 1fr and other as 5fr */}
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
