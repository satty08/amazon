const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const stripe = require('stripe')('sk_test_51HScaQHS2v49aqM7UjfMnzzz6HVfJJj0UFz2N6zXCzoPMleIyj7mBGlkXNJb2wUDtGBl6IIqk3zgWGmA1CEDSmzM00iqEdLsgK')

// API

// App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => {
    response.status(200).send('hello world');
})
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Received', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: 'usd'
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command

exports.api = functions.https.onRequest(app)