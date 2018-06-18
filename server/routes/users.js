const express = require('express');
const router = express.Router();
const User = require('../models/User');

//routes are being connected to app.js through the app.use(route, require)
router.get('/', (req, res) => {
  User
    .find() //returns empty array if none exist yet
    .then(users => {
      res.status(200).json(users);
    });
  ;
  //Q: is using a promise better than not? A: preference but .then has better error handling
  //The following code works but returns in text form. Same as .then
  // .find(function (err, users) {
  //   res.status(200).send(users);
  // })
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  User
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send('User not found!');
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
  //create a user .save()
  let newUser = new User(req.body);
  newUser
    .save()
    .then(post => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).send(err);
      }
    })
    .catch(console.error);
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  User
    .findByIdAndUpdate(id, {$set: req.body})
    .then(item => {
      if (item) {
        res.status(204).json(item);
      } else {
        res.status(404).send(err)
      }
    })
    .catch(console.error);
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  User
    .findByIdAndRemove(id)
    .then(item => {
      res.status(200).json(item)
    })
    .catch(console.error);
});

module.exports = router;