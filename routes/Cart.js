const express = require('express');
const router = express.Router();

const {addItemToCart, getCart, updateCart, deleteItemFromCart} = require('../controllers/cart')

router
    .route('/:id')
        .post(addItemToCart)
        .get(getCart)
        .put(updateCart)
        .delete(deleteItemFromCart);

module.exports = router