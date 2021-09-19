//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const names = ["Steven", "Tom", "Michael"];
router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    names: names,
  });
});

router.post('/addUser', (req, res, next) => {
  const newUser = req.body.newUser;

  names.push(newUser);
  res.redirect('/ta02/');
});

router.post('/removeUser', (req, res, next) => {
  const remUser = req.body.remUser;

  const index = names.indexOf(remUser);
  if (index !== -1) {
    names.splice(index, 1);
  }
  res.redirect('/ta02/');
});


module.exports = router;
