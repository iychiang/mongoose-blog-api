const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User')

//what exactly is the Schema.Types.ObjectId represent/reference?
router.get('/', (req, res) => {
  Blog
    .find()
    .populate('author')
    //need to populate .gets with the actual author object not just the string value
    //http://mongoosejs.com/docs/populate.html
    .then(blogs => {
      if (blogs) {
        res.status(200).json(blogs);
      } else {
        res.status(404).send(error)
      }
    })
    .catch(console.error);
});

router.get('/featured', (req, res) => {
  Blog
    .where('featured', true)
    .populate('author')
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(error => console.log('this is error w/ featured', error));
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Blog
    .findById(id)
    .populate('author')
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).send('Not found!')
      }
    })
    .catch(console.error);
})

router.post('/', (req, res) => {
  let dbUser = null;
  User
    .findById(req.body.authorId)
    .then(user => {
      console.log('first .then statement', JSON.stringify(user));
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      //binds new user
      return newBlog.save();
    })
    .then(blog => {
      console.log('second .then statement', JSON.stringify(blog));
      dbUser.blogs.push(blog);
      //Pushes saved blog to blogs associated with User
      dbUser.save()
      .then(() => res.status(201).json(blog));
      console.log('dbUser', dbUser)
    })
    .catch(console.error)
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  Blog
    .findByIdAndUpdate(id, { $set: req.body })
    .then(item => {
      if (item) {
        res.status(204).json(item);
      } else {
        res.status(404).send(error);
      }
    })
    .catch(console.error);
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Blog
    .findByIdAndRemove(id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(console.error);
})

module.exports = router;