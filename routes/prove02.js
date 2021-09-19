const express = require("express");
const router = express.Router();

const books = [];
router.get("/", (req, res, next) => {
    res.render("pages/prove02", {
        title: "Prove 02",
        path: "/prove02",
        books: books,
    });
});

router.get("/add-book", (req, res, next) => {
    res.render("pages/prove02-add-book", {
        title: "Prove 02 Add Book",
        path: "/prove02-add-book",
    });
});

router.post("/add-book", (req, res, next) => {
    const book = {};
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    books.push(book);
    res.redirect("/prove02/")
});

router.get("/remove-book", (req, res, next) => {
    res.render("pages/prove02-remove-book", {
        title: "Prove 02 Remove Book",
        path: "/prove02-remove-book",
    });
});

router.post("/remove-book", (req, res, next) => {
    const remProduct = req.body.title;
    for(i = 0; i < books.length; i++) {
        if (books[i].title === remProduct){
            books.splice(i, 1);
        }
    }
    res.redirect("/prove02/")

})

module.exports = router;