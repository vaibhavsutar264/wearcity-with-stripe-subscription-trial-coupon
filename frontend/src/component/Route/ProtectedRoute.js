import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom"

const ProtectedRoute = ({isAdmin,component:Component, ...rest}) => {
    //here rest means the path and exact of route 
    const { loading, isAuthenticated, user} = useSelector((state)=> state.user);
    return (
        <Fragment>
            {loading === false && (
                //we need to use loading === false instead of !loading because if we use !loading then it redirect or bug will be there and it will redirect you to account page
                <Route 
                {...rest}
                render= {
                    (props)=>{
                        //props means in useroption of app.js user={user} is written that is props
                        if(isAuthenticated === false){
                            // if not authenticated means it is not logged in so he cannot come in accout page by writing localhost/account in url box so where will he go then so for that return condition is stated saying it will go on login page
                            return <Redirect to="/login" />; 
                            //redirect is react-router-dom predefined function to send an element on certain page is condition is false
                        }
                        // and if authenticated means if there is token in cookies then user will be taken to desired component and website will render as stated in the below return

                        if(isAdmin === true && user.role !== "admin"){
                            //it means that if user is not an admin and he is accessing the dashboard by writing the localhost:3000/admin/dashboard then he cannot access it now with above condition
                            return <Redirect to="/login" />; 
                        }

                        return <Component {...props}/>
                    }
                }/>
            )}
            
        </Fragment>
    )
}

export default ProtectedRoute
