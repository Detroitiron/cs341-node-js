const Book = require('../models/books');



exports.getBooks = (req, res, next) => {
    const books = Book.fetchAll((books) => {
        res.render("shop/prove02-booklist", {
            title: "All Products",
            path: "/prove02",
            books: books,
        });
    });
};

exports.getIndex = (req, res, next) => {
    const books = Book.fetchAll((books) => {
        res.render("shop/index", {
            title: "Shop",
            path: "/prove02",
            books: books,
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: "Your Cart"
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: "Checkout"
    });
};