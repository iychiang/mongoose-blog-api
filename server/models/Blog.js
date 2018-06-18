const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema ({
  title: { type: String, required: true },
  article: { type: String, required: true },
  published: { type: Date, required: true },
  featured: { type: Boolean, required: true },
  authorId: { type: Schema.Types.ObjectId, required: false },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;