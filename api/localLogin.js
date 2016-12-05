import express from 'express';
import passport from 'passport';
import jwt from 'jwt-simple'
import mongoose from 'mongoose';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, username: user.username }, process.env.SECRET);
}

export function setupLocalLogin(app) {

  mongoose.Promise = require('bluebird');
  //connect db
  mongoose.connect(process.env.MONGODB_URL);

  require('./config/passport')(passport);

  // sign up and sign in are handled by auth controller
  app.post('/signin', passport.authenticate('local-login', {session: false}), (req, res)=>{
    res.send(tokenForUser(req.user));
  });

  app.post('/signup', passport.authenticate('local-signup'), (req, res)=>{
    res.send({id: req.user.id, username: req.user.username});
  });

  app.get('/user', passport.authenticate('jwt', {session: false}), (req, res)=>{
    if (req.user) {
        res.send({id: req.user._id, username: req.user.username});
    } else {
        res.send(null);
    }
  });

}