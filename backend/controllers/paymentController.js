
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeFile = require('./stripe')


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
    //   const customerWithUSD = await stripe.customers.update(
    //     'cus_NLd2pTVDM7UQ1L',
    //     {currency: "usd"}
    //   );
    
      // const invoiceItem = await stripe.invoiceItems.create({
      //   customer: 'price_1MZEt8SHR0RldS5SFuVbbSCC',
      //   amount:200000
      //   currency: 'usd',
      // });

    //   coupon:'mIIb2i8o'

    // const condition = req.body.couponValue === 'mIIb2i8o'? discounts:[
    //     {
    //       coupon:req.body.couponValue
    //     }
    //   ]

    // req.body.couponValue === 'mIIb2i8o'? {
    //     coupon:req.body.couponValue
    // } : null
    
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
    
      return res.json(req.body.couponValue == 'mIIb2i8o'? sessionWithCoupon: session);

});


