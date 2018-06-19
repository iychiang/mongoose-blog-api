const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV != 'production') {
mongoose.connect('mongodb://localhost/my-blog');
} else {
mongoose.connect(process.env.MONGODB_URI)
}

mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;