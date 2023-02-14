//creating token and saving in cookie

const sendToken = (user, statusCode, res) => {

    // this sendtoken is called i register so he is accessing the user from register function made constant user 

    const token = user.getJWTToken();
    //user accessing from rigister loginuser fuction in that function user constatnt is defined so it is accessing from there only
    //this getjwttoken which is stored in token variable is defined in usermodels and user is defined in usercontroller.js

    //now we will store this token in cookies but we will not save directly in cookies we will first save this token in a object name as options

    const options = {
        // here we will send the token in cookie so from cookie when will this cookie will expire this value will also be 5 days as given in config.env  
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
            //here the expire time is taken more from the date which he is loggd in and it is converted into the miliseconds value
        ),
        httpOnly: true,

    }

    res.status(statusCode).cookie("token",token, options).json({
        //in cookie 1st parameter is the keywod of token as token in brown color second parameter is the actual token which is blue token and 3rs parameter is option for cookie expiry
        //by this token saved in cookie from backend also with token it also send options such as expiry as stated above
        success: true,
        user,
        token,
    });

    // by this function when we will call this function in usercontroller we will send as sendtoken(user,201,res) by this this function is modified with taking different parameters as like in this res means res in taken from this code and res has token and user and success true but res require status code so we have passed 201 also token has a user from user.create so it tkes all parameters
};

module.exports = sendToken;