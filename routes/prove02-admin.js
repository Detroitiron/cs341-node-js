const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");


router.get("/add-book", adminController.getAddBook);

router.get("/products", adminController.getProducts);
router.post("/add-book", adminController.postAddBook);

router.get("/remove-book", adminController.getRemoveBook);

router.post("/remove-book", adminController.postRemoveBook);

module.exports = router;