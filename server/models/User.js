const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  social: {
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedIn: { type: String, required: false }
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;