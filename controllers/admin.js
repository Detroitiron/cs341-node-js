const Book = require('../models/books');
const { validationResult } = require('express-validator');
const {get500} = require('../util/error');


exports.getAddBook = (req, res, next) => {
    res.render("admin/edit-book", {
        title: "Add Book",
        path: "/admin/add-book",
        editing: false,
        errorMessage: null,
        hasError: false,
        book: {
            title: '',
            author: '',
            genre: '',
        },
        validationErrors: [],
    })};

exports.postAddBook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(422).render('admin/edit-book', {
            pageTitle: 'Add Book',
            path: '/admin/add-book',
            editing: false,
            hasError: true,
            book: {
                title: title,
                author: author,
                genre: genre,
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    const book = new Book(
        {title: title,
            author: author,
            genre: genre,
            userId: req.user._id});
    book.save()
    .then(result => {
        console.log('Created Product');
        res.redirect("/books")
    }).catch(err => {
        get500(err, next);
    })
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
            book: book,
            hasError: false,
            errorMessage: null,
            validationErrors: []

        });
    })
    .catch(err => {
        get500(err, next);
    }
        
    );
};

exports.postEditBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedAuthor = req.body.author;
    const updatedGenre = req.body.genre;
    const errors = validationRequest(req);

    if (!errors.isEmpty()){
        return res.status(422).render('admin/edit-book', {
            pageTitle: 'Edit Book',
            path: '/admin/edit-book',
            editing: false,
            hasError: true,
            book: {
                _id: bookId,
                title: updatedTitle,
                author: updatedAuthor,
                genre: updatedGenre,
            },
            errorMessage: errors.array()[0].msg,
            validationErros: errors.array()
        });
    }
    Book.findById(bookId)
    .then(book => {
        if (book.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/')
        }
        book.title = updatedTitle;
        book.author = updatedAuthor;
        book.genre = updatedGenre;
        return book.save().then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/books');})
    })
    .catch(err => get500(err, next));
};
    
exports.getBooks = (req, res, next) => {
    Book.find({userId: req.user._id})
    .then(books => {
        res.render("admin/books", {
            title: "All Books",
            path: "/admin/books",
            books: books,
        });
    })
    .catch(err => {
        get500(err, next);
    });
};


exports.postRemoveBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.deleteOne({_id: bookId, userId: req.user._id})
    .then(result => {
        console.log('DESTROYED BOOK');
        res.redirect("/books");
    })
    .catch(err => get500(err, next));

}