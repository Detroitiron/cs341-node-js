const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");


router.get("/add-book", adminController.getAddBook);

router.get("/books", adminController.getBooks);
router.post("/add-book", adminController.postAddBook);

router.post("/delete-book", adminController.postRemoveBook);


router.get("/edit-book/:bookId", adminController.getEditBook);
router.post("/edit-book/", adminController.postEditBook)
module.exports = router;