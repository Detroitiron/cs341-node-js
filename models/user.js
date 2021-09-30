const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'book',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(book) {
  const cartBookIndex = this.cart.items.findIndex(cp => {
    return cp.bookId.toString() === book._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartBookIndex >= 0) {
    newQuantity = this.cart.items[cartBookIndex].quantity + 1;
    updatedCartItems[cartBookIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      bookId: book._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(bookId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.bookId.toString() !== bookId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(email, password, cart, id) {
//     this.email = email;
//     this.password = password;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(book) {
//     const cartBookIndex = this.cart.items.findIndex(cp => {
//       return cp.bookId.toString() === book._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartBookIndex >= 0) {
//       newQuantity = this.cart.items[cartBookIndex].quantity + 1;
//       updatedCartItems[cartBookIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         bookId: new ObjectId(book._id),
//         quantity: newQuantity
//       });
//     }
//     const updatedCart = {
//       items: updatedCartItems
//     };
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const bookIds = this.cart.items.map(i => {
//       return i.bookId;
//     });
//     return db
//       .collection('books')
//       .find({ _id: { $in: bookIds } })
//       .toArray()
//       .then(books => {
//         return books.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.bookId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       });
//   }

//   deleteItemFromCart(bookId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.bookId.toString() !== bookId.toString();
//     });
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: {items: updatedCartItems} } }
//       );
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log("USER: ", user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
