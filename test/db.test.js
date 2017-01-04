var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development',
    cfg = require('../config/'+env),
    expect = require('chai').expect,
    assert   = require('assert'),
    mongoDB  = require('../db'),
    User = require('../models/user');

describe('Mongoose -> Users ', function() {
    let user = {
    "profile"   : {
      'username'  : 'thomas',
      'first-name': 'Thomas',
      'last-name' : 'New',
      'picture'   : 'http://www.google.com/images/picture.png'
    },
    "data"      : {
      "oauth"   : "facebook"
    }
   };
    beforeEach(function(done){
        mongoDB(cfg.mongodb.uri, function(){
            done();
        });
    });

    it('Should insert an entry', function(done) {
      new User(user).save(function(err, userInfo) {
         expect(err).to.not.exist;
         expect(userInfo).to.exist;
         done();
      });
    });

    it('Should query an entry ', function(done) {
      var query = User.find({"profile.username":"thomas"});
      query.exec(function(err, docs) {
         expect(err).to.not.exist;
         expect(docs).to.exist;
         expect(docs[0].profile.username).equal(user.profile.username);
         done();
      });
    });

    it('Should find an entry and remove ', function(done) {
      var query = User.findOneAndRemove({"profile.username":"thomas"});
      query.exec(function(err, docs) {
         expect(err).to.not.exist;
         User.find({},function(err,docs) {
            expect(err).to.not.exist;
            expect(docs.length).to.equal(0);
            done();
         });
      });
    });

    after( function(done) {
      var query = User.find({}).remove();
      query.exec(function(err, docs) {
         expect(err).to.not.exist;
         User.find({},function(err,docs) {
            expect(err).to.not.exist;
            expect(docs.length).to.equal(0);
            done();
         });
      });
    });
});
