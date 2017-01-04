
/*
  Reference for mongoose.
  https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true }
  }
});

var User = mongoose.model('User', userSchema);
// wagner.factory('User', function() {
//   return User;
// });
module.exports = User;
// module.exports.set('toObject', { virtuals: true });
// module.exports.set('toJSON', { virtuals: true });
