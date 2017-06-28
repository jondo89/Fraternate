var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Sign in with Email and Password
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (!user) {
      return done(null, false, { msg: 'The email address ' + email + ' is not associated with any account. ' +
      'Double-check your email address and try again.' });
    }
    user.comparePassword(password, function(err, isMatch) {
      if (!isMatch) {
        return done(null, false, { msg: 'Invalid email or password' });
      }
      return done(null, user);
    });
  });
}));

// Sign in with Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ google: profile.id }, function(err, user) {
      if (user) {
        req.flash('error', { msg: 'There is already an existing account linked with Google that belongs to you.' });
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.displayName;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || profile._json.image.url;
          user.google = profile.id;
          user.save(function(err) {
            req.flash('success', { msg: 'Your Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, function(err, user) {
      if (user) {
        return done(null, user);
      }
      User.findOne({ email: profile.emails[0].value }, function(err, user) {
        if (user) {
          req.flash('error', { msg: user.email + ' is already associated with another account.' });
          done(err);
        } else {
          var newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            gender: profile._json.gender,
            location: profile._json.location,
            picture: profile._json.image.url,
            google: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        }
      });
    });
  }
}));
