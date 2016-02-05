var passport = require('koa-passport')
var fetch = require('node-fetch');

passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(_id, done) {
  done(null, _id);
})

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  const body = {username, password};
  fetch('http://localhost:4001/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => {
    if(res.ok) {
      return res.json();
    }else {
      return false;
    }
  }).then( res => {
    done(null, res);
  });
}))

// var FacebookStrategy = require('passport-facebook').Strategy
// passport.use(new FacebookStrategy({
//     clientID: 'your-client-id',
//     clientSecret: 'your-sAecret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     done(null, user)
//   }
// ))
//
// var TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//     consumerKey: 'your-consumer-key',
//     consumerSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     done(null, user)
//   }
// ))
//
// var GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//     clientId: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     done(null, user)
//   }
// ))
