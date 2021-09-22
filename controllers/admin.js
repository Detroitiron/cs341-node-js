const Book = require('../models/books');

exports.getAddBook = (req, res, next) => {
    res.render("admin/prove02-add-book", {
        title: "Prove 02 Add Book",
        path: "/prove02-add-book",
    })};

exports.postAddBook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    
    const book = new Book(title, author, genre);
    book.save();
    res.redirect("/prove02/")
};

exports.getRemoveBook = (req, res, next) => {
    res.render("admin/prove02-remove-book", {
        title: "Prove 02 Remove Book",
        path: "/prove02-remove-book",
    });
}

exports.postRemoveBook = (req, res, next) => {
    const remProduct = req.body.title;
    Book.removeBook(remProduct, (books) => {
        res.render("shop/prove02-booklist", {
            title: "Prove 02",
            path: "/prove02",
            books: books,
        });
    })

}

exports.getProducts = (req, res, next) => {
    Book.fetchAll((books) => {
        res.render("admin/products", {
            title: "All Products",
            path: "/admin/products",
            books: books,
        });
    });
};
