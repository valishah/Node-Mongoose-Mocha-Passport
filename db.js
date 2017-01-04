var mongoose = require('mongoose');

module.exports = function(dbURL,cb) {
  if(mongoose.connection.db) return cb();
  mongoose.connect(dbURL,cb);
};
