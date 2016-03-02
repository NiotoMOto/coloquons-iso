const passport = require('koa-passport')
const fetch = require('node-fetch');

passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(function(_id, done) {
  fetch(`http://localhost:4001/api/v1/Users/${_id}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => {
    if(res.ok) {
      return res.json();
    }else {
      done(null, null);
    }
  }).then (user => {
    done(null, user);
  });

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

const GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
    clientId: '518401525808-7ddtol6bmdeqa1vi07hmt74p2cs95392.apps.googleusercontent.com',
    clientSecret: 'HCZ2ksQaZiPobfbk32XqYwn1',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      const body = {"google.id": profile.id }
      fetch(`http://localhost:4001/api/v1/Users?query=${JSON.stringify(body)}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
      }).then( users => {
        console.log(users.length, users[0]);
        if(users.length) {
          done(null, users[0]);
        }else {
          const newUser = {
            username: profile.displayName,
            google: {
              id: profile.id,
              token,
              name: profile.displayName,
              email: profile.emails[0].value
            }
          };
          fetch('http://localhost:4001/api/v1/Users', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          }).then(res => {
            if(res.ok){
              return res.json();
            }else {
              return false;
            }
          }).then(res => {
            done(null, res);
          });
        }

      },err => {
        return false;
      });
    })
  }
))




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
