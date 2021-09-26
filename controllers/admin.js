const mongodb = require('mongodb');
const Book = require('../models/books');

const ObjectId = mongodb.ObjectId;

exports.getAddBook = (req, res, next) => {
    res.render("admin/edit-book", {
        title: "Add Book",
        path: "/admin/add-book",
        editing: false
    })};

exports.postAddBook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    
    const book = new Book(title, author, genre);
    book.save()
    .then(result => {
        console.log('Created Product');
        res.redirect("/shop/books")
    }).catch(err => {
        console.log(err);
    })
};

exports.postRemoveBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.deleteById(bookId)
    .then(result => {
        console.log('DESTROYED BOOK');
        res.redirect("/shop/books");
    })
    .catch(err => console.log(err));

}

exports.getBooks = (req, res, next) => {
    Book.fetchAll()
    .then(books => {
        res.render("admin/books", {
            title: "All Books",
            path: "/admin/books",
            books: books,
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const bookId = req.params.bookId;
    Book.findById(bookId)
    .then(book => {
        if (!book) {
            return res.redirect('/');
        }
        res.render('admin/edit-book', {
            pageTitle: 'Edit Book',
            path: '/admin/edit-book',
            editing: editMode,
            book: book
        });
    })
    .catch(err => console.log(err));
};

exports.postEditBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedAuthor = req.body.author;
    const updatedGenre = req.body.genre;

    const book = new Book(updatedTitle, updatedAuthor, updatedGenre, new ObjectId(bookId));
    book.save()
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/books');
    }).catch(err => console.log(err));
};