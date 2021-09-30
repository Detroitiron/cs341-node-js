const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is-auth')
const router = express.Router();


router.get("/add-book", isAuth, adminController.getAddBook);

router.get("/books", isAuth, adminController.getBooks);
router.post("/add-book", isAuth, adminController.postAddBook);

router.post("/delete-book", isAuth, adminController.postRemoveBook);


router.get("/edit-book/:bookId", isAuth, adminController.getEditBook);
router.post("/edit-book/", isAuth, adminController.postEditBook)
module.exports = router;