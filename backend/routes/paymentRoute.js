const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {subscriptionwithoutcheckoutsession, processPayment , sendStripeApiKey, stripeSession, cancelSubscription, cancelWithSubscriptionId} = require("../controllers/paymentController");


// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
router.route("/subscribe").post(subscriptionwithoutcheckoutsession);
router.route("/payment/process").post(processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);
router.route("/session").post(stripeSession);
router.route("/cancelSubscription").get(cancelSubscription);
router.route("/cancelWithSubscriptionId").get(cancelWithSubscriptionId);





module.exports = router;