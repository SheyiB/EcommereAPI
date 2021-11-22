const express = require('express');
const router = express.Router();

const {addItemToCart, getCart, updateCart} = require('../controllers/cart')

router
    .route('/:id')
        .post(addItemToCart)
        .get(getCart)
        .put(updateCart)

module.exports = router