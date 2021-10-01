const Book = require('../models/books');
const Order = require('../models/user');
const { get500 } = require('../util/error');



exports.getBooks = (req, res, next) => {
   Book.find()
   .then((books) => {
        res.render("shop/prove02-booklist", {
            title: "All Books",
            path: "/books",
            books: books,
        });
    }).catch(err => get500(err, next));
};

exports.getBook = (req, res, next) => {
    const bookId = req.params.bookId;
    
    Book.findById(bookId)
    .then((book) => {
        res.render("shop/book-detail", {
            title: book.title,
            path: "/prduct-detail",
            book: book,
        });
    }).catch(err => get500(err, next))    
}

exports.getIndex = (req, res, next) => {
    Book.find()
    .then((books) => {
        res.render("shop/index", {
            title: "Shop",
            path: "/index",
            books: books,
        });
    }).catch(err => get500(err, next));
}

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.bookId')
    .then(user => {
        const books = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            books: books,
    });
    })
      .catch(err => get500(err, next));
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
  
  exports.postCartDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    req.user
      .removeFromCart(bookId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => get500(err, next));
  };
  
  exports.postOrder = (req, res, next) => {
    req.user
      .populate('cart.items.bookId')
      .then(user => {
        const books = user.cart.items.map(i => {
          return { quantity: i.quantity, book: { ...i.bookId._doc } };
        });
        const order = new Order({
          user: user,
          books: books
        });
        return order.save();
      })
      .then(result => {
        return req.user.clearCart();
      })
      .then(() => {
        res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };
  
  exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
      .then(orders => {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders,
        });
      })
      .catch(err => get500(err, next));
  };
  