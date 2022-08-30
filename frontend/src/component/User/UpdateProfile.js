import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector(
        (state) => state.user //this user is taken from store.js file 
    );

    const { error, loading, isUpdated } = useSelector(
        (state) => state.profile //this profile is taken from store.js file 
    );

    const [avatar, setAvatar] = useState("/logo192.png");
    const [avatarPreview, setAvatarPreview] = useState("/logo192.png");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        // here userdata is myform which is taken from backend and also u can create now in updateProfile form and it will save in backend
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                // here 2 is for done condition 0 isfor initial and 1 is for processing condition
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    //   const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {


        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);

        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("profile updated successfully");
            dispatch(loadUser());
            history.push("/account");
        }

        dispatch({
            type: UPDATE_PROFILE_RESET,
            // it is taken to make isupdate false
        })
    }, [dispatch, error, alert, history, isUpdated, user]);
      //first before doing html and putting or attaching data from state we need to send data in state by using useeffect and then after the data reaches in state of redux termainal we will fetch those data in html below
  // data is given in redux terminal by using actions functions


    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>
                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input type="submit" value="Update Profile" className="updateProfileBtn" />
                            </form>


                        </div>
                    </div>

                </Fragment>)}
        </Fragment>
    )
}

export default UpdateProfile
