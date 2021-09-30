const Book = require('../models/books');



exports.getBooks = (req, res, next) => {
   Book.find()
   .then((books) => {
        res.render("shop/prove02-booklist", {
            title: "All Books",
            path: "/books",
            books: books,
        });
    }).catch(err => console.log(err));
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
    })    
}

exports.getIndex = (req, res, next) => {
    Book.find()
    .then((books) => {
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
    .populate('cart.items.bookId')
    .execPopulate()
    .then(user => {
        const books = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            books: books,
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
  
  exports.postCartDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    req.user
      .removeFromCart(bookId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };
  
  exports.postOrder = (req, res, next) => {
    req.user
      .populate('cart.items.bookId')
      .execPopulate()
      .then(user => {
        const books = user.cart.items.map(i => {
          return { quantity: i.quantity, book: { ...i.bookId._doc } };
        });
        const order = new Order({
          user: {
            email: req.user.email,
            userId: req.user
          },
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
      .catch(err => console.log(err));
  };
  