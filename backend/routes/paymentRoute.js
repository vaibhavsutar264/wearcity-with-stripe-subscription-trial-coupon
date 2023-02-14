const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { processPayment , sendStripeApiKey, stripeSession } = require("../controllers/paymentController");


router.route("/payment/process").post(processPayment);
// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
router.route("/stripeapikey").get(sendStripeApiKey);
router.route("/session").post(stripeSession);





module.exports = router;