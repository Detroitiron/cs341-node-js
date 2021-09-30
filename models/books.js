const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
// const mongodb = require('mongodb')
// const { getDb } = require('../util/database')

// const getBooksFromFile = (cb) => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// }
// module.exports = class Book {
//     constructor(title, author, genre, id, userId) {
//         this.title = title;
//         this.author = author;
//         this.genre = genre;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }
    
//     save () {
//         const db = getDb();
//         let dbOp;
//         if (this._id){
//             dbOp = db.collection('books').updateOne({_id: this._id}, {$set: this});
//         } else {
//             dbOp = db.collection('books').insertOne(this)
//         }
//         return dbOp.then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('books').find().toArray()
//         .then(result => {
//             console.log(result);
//             return result;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static findById(bookId) {
//         const db = getDb();
//         return db.collection('books').find({_id: new mongodb.ObjectId(bookId)}).next()
//         .then(result => {
//             console.log(result);
//             return result;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static deleteById(bookId) {
//         const db = getDb();
//         return db.collection('books').deleteOne({_id: new mongodb.ObjectId(bookId)})
//         .then(result => {
//             console.log("deleted");
//         })
//         .catch(err => console.log(err));
//     }
// }