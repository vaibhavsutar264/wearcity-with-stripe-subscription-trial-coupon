const express = require("express");
const cors = require('cors');
const session = require("express-session");
const memorystore = require('memorystore')(session)
const app = express();
// const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");
//now for uploading a file we require body parser and file uploader

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");
const path = require("path")

if(process.env.NODE_ENV !== "PRODUCTION" ){
    require("dotenv").config({path:"backend/config/config.env"});
} //this is used for process.env path location which is stated below


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Routes import

const product = require("./routes/productRoute"); //this is just a route or a link imported in this app.js file
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1",product);
app.use("/api/v1",user); //user data to be post from frontend
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(
    session({
      saveUninitialized: false,
      cookie: { maxAge: 86400000 },
      store: new memorystore({
        checkPeriod: 86400000,
      }),
      resave: false,
      secret: 'keyboard cat',
    }),
  )
// middleware for errors

//deployment part start

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*",(req,res)=>{
    //here * means all frontend url 
   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
});

//heroku link for admin : https://wearcity-1.herokuapp.com/ 
//heroku link for users : https://wearcity-for-users-2.herokuapp.com/ 

//deployment part end

app.use(errorMiddleware);

module.exports = app;