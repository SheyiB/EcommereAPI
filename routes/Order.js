const express = require('express');
const router = express.Router();

const {checkout, getOrder, getAllOrders} = require('../controllers/order')

router
    .route('/checkout/:id')
        .post(checkout)

router
    .route('/:id')
        .get(getOrder)

router
    .route('/')
        .get(getAllOrders)
module.exports = router