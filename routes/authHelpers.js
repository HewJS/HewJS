const User = require('../database/models/user');

const isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

exports.checkPassword = function(username, passwordGuess) {
  return User.findOne({ username: username, password: passwordGuess }).exec();
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    res.redirect('/');
  });
};

exports.destroySession = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};