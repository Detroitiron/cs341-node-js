const { ObjectId } = require('bson');
const Book = require('../models/books');



exports.getBooks = (req, res, next) => {
   Book.fetchAll().then((data) => {
    let books;
    console.log("DATA: ", data);
    if (data === undefined){
        books = [];
        } else {
            books = data;
        }
        res.render("shop/prove02-booklist", {
            title: "All Products",
            path: "/books",
            books: books,
        });
    }).catch(err => console.log(err));
};

exports.getBook = (req, res, next) => {
    const bookId = req.params.bookId;
    
    Book.findById(bookId).then((book) => {
                res.render("shop/product-detail", {
                        title: "Shop",
                        path: "/prduct-detail",
                        book: book,
                    });
    })    
}

exports.getIndex = (req, res, next) => {
    Book.fetchAll().then((data) => {
        let books;
        if (data === undefined) {
            books = [];
        } else {
            books = data;
        }
        res.render("shop/index", {
            title: "Shop",
            path: "/index",
            books: books,
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res, next) => {
    req.user
    .getCart()
    .then(books => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        books: books
    });
    })
      .catch(err => console.log(err));
  };
  
  exports.postCart = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.findById(bookId)
      .then(book => {
        return req.user.addToCart(book);
      })
      .then(result => {
        console.log(result);
        res.redirect('/cart');
      });
  };
  
  exports.postCartDeleteProduct = (req, res, next) => {
    const bookId = req.body.bookId;
    req.user
      .deleteItemFromCart(bookId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };
  

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: "Checkout"
    });
};