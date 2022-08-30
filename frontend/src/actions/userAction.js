import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST, 
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST, 
    UPDATE_USER_SUCCESS, 
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";


//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //this config file is required for post request

        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        )
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });

    }
}


//register
export const register = (userData) => async (dispatch) => {
    // here user data is myform from ucomponent/user/loginsignup
    try {
        dispatch({ type: REGISTER_USER_REQUEST });


        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        //here user data is just a callback function to send an object of data 

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res




    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })

    }


}


//load user this is made because once u reload a page after login and previos token for login is showig in application cookies of developer tools at that time state of redux has no user user aerray is blank so we need to pass this array so for that we need to load the user data again if there is token present
//by this if u go on login page it will automatically redirect u to account page as u were got logged in because of user data present in state of redux

//in simple words if there is token present in cookies then it will automatically load user again if the user state is empty

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        //this config file is required for post request

        const { data } = await axios.get(
            `/api/v1/me`,
        )
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });

    }
}

//update profile
export const updateProfile = (userData) => async (dispatch) => {
    // here user data is myform from ucomponent/user/loginsignup
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
        //payload is linked with usercontroller res 
        // here success is written becase in usercontroller of backend update profile res send is success true only      
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        })
    }
}



//update password
export const updatePassword = (passwords) => async (dispatch) => {
    // here user data is myform from ucomponent/user/loginsignup
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //if there is no image then application.json and if image then multipart/form-data

        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
        //payload is linked with usercontroller res 
        // here success is written becase in usercontroller of backend update profile res send is success true only      
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}


//logout

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}



//forgot password

export const forgotPassword = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //this config file is required for post request

        const { data } = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        )
        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.response.data.message });

    }
}



//reset password which comes as soon as u come from forgot password email taken and reset password link is given on ur gmail

export const resetPassword = (token, passwords) => async (dispatch) => {
    //here passwords is written instead of password because 2 passwords are there 1 is new password and confirm password
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //this config file is required for post request

        const { data } = await axios.put(
            // updating or editing to a certain thing or changing a value of an input is always a put request
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        )
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });

    }
}


//all users --Admin

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        //this config file is required for post request

        const { data } = await axios.get(
            `/api/v1/admin/users`,
        )
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });

    }
}

//get single user--Admin 

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        //this config file is required for post request

        const { data } = await axios.get(
            `/api/v1/admin/user/${id}`
        );
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
        //payload is linked with usercontroller res

    } catch (error) {

        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });

    }
}



//update user
export const updateUser = (id,userData) => async (dispatch) => {
    // here user data is name & email and as it is a config file as json to send data we need to pass the user data in const data therfore userData is written
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        //if there is no image then application.json and if image then multipart/form-data

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        //payload is linked with usercontroller res 
        // here success is written becase in usercontroller of backend update profile res send is success true only      
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}


//Delete user
export const deleteUser = (id) => async (dispatch) => {
    // here user data is name & email
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
        //here only data is sent because in usercontroller res there is success and message so we need to see both so for that we made in userreducer two parameter as 1st one is isdeleted: action.payload.success, and 2nd one is message: action.payload.meessage to see both the value which we receive from usercontroller of backend
        //payload is linked with usercontroller res 
        // here success is written becase in usercontroller of backend update profile res send is success true only      
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}


//now for making errors as null clearing errors
export const clearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS });


}

