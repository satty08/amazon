const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
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
        description: 'Electronic Goods',
        shipping: {
            name: 'Satty',
            address: {
                line1: '1887 Sector 29',
                postal_code: '12108',
                city: 'Faridabad',
                state: 'Haryana',
                country: 'India'
            },
        },
        amount: total, //subunits of the currency
        currency: 'inr',
        payment_method_types: ['card']
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command

exports.api = functions.https.onRequest(app)