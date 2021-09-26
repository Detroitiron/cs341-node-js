const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const pathUtil = require('./path');
const MongoClient = mongodb.MongoClient;
const p = path.join(pathUtil, 'util', 'databaseCert.pem');

let _db;

const mongoConnect = (callback) => {
    const client = new MongoClient('mongodb+srv://cluster0.2ckfi.mongodb.net/shop?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
        sslKey: p,
        sslCert: p,
    })
    client.connect()
    .then( client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw(err)
    })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;