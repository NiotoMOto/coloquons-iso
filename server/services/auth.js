const passport = require('koa-passport')
const fetch = require('node-fetch');

passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(_id, done) {
  done(null, _id);
})

const LocalStrategy = require('passport-local').Strategy
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
const GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
    clientId: '518401525808-7ddtol6bmdeqa1vi07hmt74p2cs95392.apps.googleusercontent.com',
    clientSecret: 'HCZ2ksQaZiPobfbk32XqYwn1',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      const body = {"google.id": profile.id }
      const promise = fetch(`http://localhost:4001/api/v1/Users?query=${JSON.stringify(body)}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        const users = req.body;
        if(users.lenght){
          done(null, user[0]);
        }else{
          const newUser = {
            username: profile.displayName,
            google: {
              id: prfile.id,
              token,
              name: profile.displayName,
              email: profile.emails[0].value
            }
          };
          fetch('http://localhost:4001/api/v1/User', {
            method: 'put',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          }).then(user => {
            done(null, user);
          });
        }

      },err => {
        return false;
        console.log('err ===> ', err);
      });
      promise.then(function(){
        console.log("toto");
      })
      console.log(promise);
    })
  }
))
