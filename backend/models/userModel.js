const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); //to save the password in binary number form
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //crypto is the node.js built in module

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4,"Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your name"],
        unique: true,
        validator: [validator.isEmail,"Please Enter a valid Email"],
    },
    password: {
        type:String,
        required: [true, "Please Enter your Password"],
        minLength:[8,"please enter more than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,

});
//pre means before saving this function will occur

//this below function is used for hashing the password which is saved in databases
userSchema.pre("save", async function(next){
    // here function keyword is used and arrow is not used because we needed userschema password and by arrow function it was not accessible therefore function is used so that we can access that with this keyword
    // now if this.password is not changed then below condition will apply

    if(!this.isModified("password")){
        next();
        //means password is not set and directly cliced on submit button then do nothing or on update user details if we change only email then do not hash again the same password ismodified keyword is used forthis functioning
    }

    this.password = await bcrypt.hash(this.password,10);
    // and if password is changed then do hash the password
    // bcrypt has a hash function for giving password in binary number and 10 means 10 character of password
});

//JWT TOKEN for generating login token means whenever user will login his all info will save in cookies in jwt token or a token id will given to logged user until he is log in website and save in cookies

//now crete a token by using the methods function
userSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        //sign is a method to create a logged in user jswttoken, its parameters are 1st is for which user u need to create the token for this it will take the isd of that user from userschema and mongodb created _id in database for each user even if u dont initialise it in usermodel and then it takes second parameter as jwt secret and 3rd parameter as options such as expiresin 
        // jwtsecret is the user defined key u can write anythig as a key but write lots of words example : sdncbjhdvcjhsdckjsdkdbcjhsdcbsdcbsdhcbsdhcbsdjhcbsd and JWT_EXPIRE can set by user only as 5d where 5d means 5days
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password); 
    // bcrypt has a compare method for checking the password with entered password
    // here we have used bcrypt because the password which is saved in databases is in hash type so by using compare it will compare the actual password with the enteredpassword
    // by using this keyword u were saying thattake password from userschema only

}

//Generating password reset token which will be sent to nodemailer it is like a otp

userSchema.methods.getResetPasswordToken = function () {
    //generating token

    const resetToken = crypto.randomBytes(20).toString("hex"); 
    // by using random bytes 20numbers will be given in binary number form so to make it in a number readable forma use to string and after this it will provide unwanted symbols so to create in a number form use hex in to string
    //by this our token will be generated for reset password

    //hashing and adding resetpasswordtoken to userschema 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;

}



module.exports = mongoose.model("User",userSchema);