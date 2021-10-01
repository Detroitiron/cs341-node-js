const express = require("express");
const {body} = require('express-validator')
const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is-auth')
const router = express.Router();


router.get("/add-book", isAuth, adminController.getAddBook);

router.get("/books", isAuth, adminController.getBooks);
router.post("/add-book", isAuth, [
    body('title')
    .isString()
    .isLength({min: 3})
    .trim(),
    body('author')
    .isString()
    .isLength({min: 3})
    .trim(),
    body('genre')
    .isString()
    .isLength({min: 3})
    .trim()
], adminController.postAddBook);

router.post("/delete-book", isAuth, adminController.postRemoveBook);


router.get("/edit-book/:bookId", isAuth, adminController.getEditBook);
router.post("/edit-book/", isAuth, [
    body('title')
    .isString()
    .isLength({min: 3})
    .trim(),
    body('author')
    .isString()
    .isLength({min: 3})
    .trim(),
    body('genre')
    .isString()
    .isLength({min: 3})
    .trim()
], adminController.postEditBook)
module.exports = router;