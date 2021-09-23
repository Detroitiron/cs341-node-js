const Book = require('../models/books');



exports.getBooks = (req, res, next) => {
    const books = Book.fetchAll((books) => {
        res.render("shop/prove02-booklist", {
            title: "All Products",
            path: "/books",
            books: books,
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.bookId;
    console.log(prodId);
    
    Book.fetchAll((books) => {
        for(let book of books) {
            if(book.id === prodId) {
                res.render("shop/product-detail", {
                        title: "Shop",
                        path: "/prduct-detail",
                        book: book,
                    });
            }
        }
    })    
}

exports.getIndex = (req, res, next) => {
    Book.fetchAll((data) => {
        res.render("shop/index", {
            title: "Shop",
            path: "/index",
            books: data,
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