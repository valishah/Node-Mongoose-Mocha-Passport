var config = module.exports = {};

config.env = 'development';
config.hostname = 'http://localhost:3000';

//Mongo database
config.mongodb = {
  uri :  process.env.MONGO_URI || "mongodb://localhost:27017/test"
};
