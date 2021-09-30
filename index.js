const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const errorController = require('./controllers/error');

const User = require('./models/user');
// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');

const prove02Routes = require('./routes/prove02-admin');
const prove03Routes = require('./routes/prove03-shop');
const authRoutes = require('./routes/auth');
const MONGODB_URI = 
"mongodb+srv://dummy:JddIw3TIiyGuXIUX@cluster0.2ckfi.mongodb.net/shop";;
const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})
const csrfProtection = csrf();
app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use(session({
  secret: 'montovwelqoqwemotlhoasgjqlwenmtoqiwf', 
  resave: false, 
  saveUninitialized: false, 
  store: store
}))
.use(csrfProtection)
.use(flash())
.use(bodyParser.urlencoded({ extended: false })) // For parsing the body of a POST
.use((req, res, next) => {
  if (!req.session.user){
    return next();
  }
    User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  })
.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})
.use('/ta01', ta01Routes)
.use('/ta02', ta02Routes)
.use('/ta03', ta03Routes)
.use('/ta04', ta04Routes)
.use('/admin', prove02Routes)
.use('/shop', prove03Routes)
.use('/auth', authRoutes)
.get(errorController.getError);

  

  mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });