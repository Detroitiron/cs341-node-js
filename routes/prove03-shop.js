const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/books', shopController.getBooks);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/book/:bookId', shopController.getProduct)
module.exports = router;