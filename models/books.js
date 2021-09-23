const fs = require('fs');
const path = require('path');
const pathUtil = require('../util/path');

const p = path.join(pathUtil, 'data', 'books.json');

const getBooksFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}
module.exports = class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
    
    save () {
        this.id = Math.random().toString();
        getBooksFromFile(books => {
            books.push(this);
                fs.writeFile(p, JSON.stringify(books), (err) => {
                    console.log(err);
            })
        })
        
    }

    static fetchAll(cb) {
        getBooksFromFile(cb)
    }

    static removeBook(remProduct, cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb({err: "No books available", data: []});
            }
            const books = JSON.parse(fileContent);
            for(let i = 0; i < books.length; i++) {
                if (books[i].title === remProduct){
                    books.splice(i, 1);
                }
            }
            cb(books);
        })
    }
}