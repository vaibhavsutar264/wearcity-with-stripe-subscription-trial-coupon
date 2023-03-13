
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeFile = require('./stripe')

exports.subscriptionwithoutcheckoutsession = catchAsyncErrors(async (req, res, next) => {
  try {
    if (req.method != "POST") return res.status(400);
    const { name, email, paymentMethod } = req.body;
    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });
    // Create a product
    const product = await stripe.products.create({
      name: "Monthly subscription",
    });
    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "INR",
            product: product.id,
            unit_amount: req.body.price*100,
            recurring: {
              interval:  req.body.planDuration == 'Monthly'? "month" : "year",
            },
          },
        },
      ],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      coupon:'mIIb2i8o',
      expand: ["latest_invoice.payment_intent"],
      // trial_from_plan:true,
      trial_period_days:1,
      // trial_end: new Date().setDate(new Date().getDate() + 7)
    });
    console.log(subscription);
    // Send back the client secret for payment
    res.json({
      message: "Subscription successfully initiated",
      // clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

});


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create(
        {
            amount: req.body.amount,
            currency: "usd",
            metadata: {
                company: "Ecommerce",
            },
        }
    );
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
        //here mypaypent has a client secret
    });
});


// for sending stripe api key
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });


});


exports.stripeSession = catchAsyncErrors(async (req, res, next) => {

    const customer = await stripe.customers.create(
        {
          email:req.body.emailValue,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );
    
      console.log('====================================');
      console.log(customer);
      console.log('====================================');



    
      const session = await stripe.checkout.sessions.create(
        {
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              // price: req.body.priceId,
              quantity: 1,
              // amount:2000,
              // currency:'inr',
              // name:'vaibhav sutar'
              price_data: {
                product_data: {
                  name: 'my plan',
                },
                currency: "inr",
                unit_amount: req.body.price*100,
                recurring: {
                  interval:  req.body.planDuration == 'Monthly'? "month" : "year",
                },
              },
              // price_data: {
              //   unit_amount: 500,
              //   currency: 'USD',
              //   // quantity: 1,
              // },
              // recurring: {
              //   interval: "month",
              // },
            },
          ],
          subscription_data : {
            trial_period_days:1
          },
          success_url: "http://localhost:3000/user-registration/2",
          cancel_url: "http://localhost:3000",
          customer: customer.id,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        },
      );

      const sessionWithCoupon = await stripe.checkout.sessions.create(
        {
          mode: "subscription",
          payment_method_types: ["card"],
          discounts:[
            {
                coupon:'mIIb2i8o'
            }
          ],
          line_items: [
            {
              // price: req.body.priceId,
              quantity: 1,
              // amount:2000,
              // currency:'inr',
              // name:'vaibhav sutar'
              price_data: {
                product_data: {
                  name: 'my plan',
                },
                currency: "inr",
                unit_amount: req.body.price*100,
                recurring: {
                  interval: req.body.planDuration == 'Monthly'? "month" : "year",
                },
              },
              // price_data: {
              //   unit_amount: 500,
              //   currency: 'USD',
              //   // quantity: 1,
              // },
              // recurring: {
              //   interval: "month",
              // },
            },
          ],
          subscription_data : {
            trial_period_days:1
          },
          success_url: "http://localhost:3000/user-registration/2",
          cancel_url: "http://localhost:3000",
          customer: customer.id,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        },
      );

      console.log(session);
      console.log(sessionWithCoupon);
    
      return res.json(session);
      // return res.json(req.body.couponValue == 'mIIb2i8o'? sessionWithCoupon: session);

});


exports.cancelSubscription = catchAsyncErrors(async (req, res, next) => {

  stripe.subscriptions.update('sub_1Mc25LSHR0RldS5SEdYkXS66', {cancel_at_period_end: true});
  
  // res.status(200).json({
  //     stripeApiKey: process.env.STRIPE_API_KEY
  // });
});

exports.cancelWithSubscriptionId = catchAsyncErrors(async (req, res, next) => {

  const session = await stripe.checkout.sessions.retrieve(
    'cs_test_a1dOwZAAbtG0Ma7GZUQ5KbBJey2QLIMMc6SDf4lSE3QBJduLqOgfzFig7L'
  );

  const customer = await stripe.customers.retrieve(
    'cus_NM45KqEozIqwNS'
  );

  // const invoice = await stripe.invoices.create({
  //   customer: 'cus_NMq6iPv95c1b2c',
  // });
  
  const sub = await stripe.subscriptions.retrieve(
    'sub_1MbLxtSHR0RldS5SapDWGl1e'
  )
  // const subscription = await stripe.subscriptions.search({
  //   query: 'id:\'cs_test_a1sxVxWNVqZu5i4ecQOTIeZ83e1t0cFnAjKgyekgWEwm6TH3loli9KK2io\'',
  // });

  console.log(session);
  // console.log(sub);
  // console.log(invoice);
  // console.log(customer);
  // console.log(session.subscription);
  // const cancelSubscriptionResponse = stripe.subscriptions.update(JSON.stringify(session.subscription), {cancel_at_period_end: true});
  res.status(200).json({
    // respond: session,
    message:'subscription cancellation successful'
});
});





