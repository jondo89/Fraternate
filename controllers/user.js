var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var recaptcha = require('express-recaptcha');
recaptcha.init(process.env.SITE_KEY, process.env.SECRET_KEY);

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo
 


/**
 * Login required middleware
 */
 exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/signin');
  }
};

/**
 * GET /login
 */
 exports.loginGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signin', {
    pagetitle: 'Sign in | '+sitename+''
  });
};

/**
 * POST /login
 */
 exports.loginPost = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });
  var errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors);
    return res.redirect('/signin');
  }
  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      req.flash('error', info);
      return res.redirect('/signin')
    }
    req.logIn(user, function(err) {
      res.redirect('/');
    });
  })(req, res, next);
};

/**
 * GET /signout
 */
 exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 */
 exports.signupGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    pagetitle: 'Sign up | '+sitename+''
  });
};

/**
 * POST /signup
 */
 exports.signupPost = function(req, res, next) {
   recaptcha.verify(req, function(error){
    if(!error){ 
      req.assert('username', 'Username cannot be blank').notEmpty();
      req.assert('email', 'Email is not valid').isEmail();
      req.assert('email', 'Email cannot be blank').notEmpty();
      req.assert('password', 'Password must be at least 8 characters long').len(8);
      req.sanitize('email').normalizeEmail({ remove_dots: false });
      
      var errors = req.validationErrors();
      if (errors) {
        req.flash('error', errors);
        return res.redirect('/signup');
      }
      //check the email for duplicate.
      User.findOne({ email: req.body.email }, function(err, user) {
        if (user) {
          req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
          return res.redirect('/signup');
        }
        //check the user name for duplicate.
        User.findOne({ username: req.body.username }, function(err, username) {
          if (username) {
            req.flash('error', { msg: 'The username you have entered is already associated with another account.' });
            return res.redirect('/signup');
          }
          user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            permission : 'user'
          });
          user.save(function(err) {
             
            req.logIn(user, function(err) {
              res.redirect('/');
            });
          });
        });
      });
    } else { 
      req.flash('error', { msg: 'Heads up , You may very well be a robot.' });
      return res.redirect('/signup');
    }
  })
 };

/**
 * GET /account
 */
 exports.accountGet = function(req, res) {
  res.render('account/profile', {
    pagetitle: 'My Account | '+sitename+''
  });
};

/**
 * PUT /account
 * Update profile information OR change password.
 */

 


 

exports.accountPut = function(req, res, next) {
 
  if ('password' in req.body) {
    req.assert('password', 'Password must be at least 8 characters long').len(8);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);
  } else {
   // req.assert('email', 'Email is not valid').isEmail();
   // req.assert('email', 'Email cannot be blank').notEmpty();
    //req.sanitize('email').normalizeEmail({ remove_dots: false });
  }
  var errors = req.validationErrors();
  if (errors) {
  req.flash('error', errors);
  return res.redirect(  '/users/'+req.user.username+'/settings/profile'  );
  }
  User.findById(req.user.id, function(err, user) {
    if ('password' in req.body) {
      user.password = req.body.password;
    } else {
//Profile Picture saving.
  var image = req.body.croppedImg
  var fs = require('fs');
  var directory = 'public/uploads/'
  var fileName = directory+user.id+'.jpg'
  var data = image.replace(/^data:image\/\w+;base64,/, '');

  fs.writeFile(fileName, data, {encoding: 'base64'}, function(err){
  //Finished
  });
      user.picture = '/uploads/'+user.id+'.jpg'
      user.email = req.body.email;
      user.name = req.body.name;
      user.bio = req.body.bio;
      //required for the disabled input area
      if (req.body.username) {
         user.username = req.body.username;
      }
      user.company = req.body.company;
      user.location = req.body.location;
      user.website = req.body.website;
      user.publicemail = req.body.publicemail;
    }
    user.save(function(err) {
      if ('password' in req.body) {
        req.flash('success', { msg: 'Your password has been changed.' });
      } else if (err && err.code === 11000) {
        req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
      } else {
        req.flash('success', { msg: 'Your profile information has been updated.' });
      }
      res.redirect('/users/'+user.username );
    });
  });
};

/**
 * DELETE /account
 */
 exports.accountDelete = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    req.logout();
    req.flash('info', { msg: 'Your account has been permanently deleted.' });
    res.redirect('/');
  });
};

/**
 * GET /unlink/:provider
 */
 exports.unlink = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    switch (req.params.provider) {
      case 'facebook':
      user.facebook = undefined;
      break;
      case 'google':
      user.google = undefined;
      break;
      case 'twitter':
      user.twitter = undefined;
      break;
      case 'vk':
      user.vk = undefined;
      break;
      case 'github':
      user.github = undefined;
      break;      
      default:
      req.flash('error', { msg: 'Invalid OAuth Provider' });
      return res.redirect('/account');
    }
    user.save(function(err) {
      req.flash('success', { msg: 'Your account has been unlinked.' });
      res.redirect('/account');
    });
  });
};

/**
 * GET /forgot
 */
 exports.forgotGet = function(req, res) {
  res.render('account/forgot', {
    pagetitle: 'Forgot Password | '+sitename+''
  });
};

/**
 * POST /forgot
 */
 exports.forgotPost = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', { msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
          return res.redirect('/forgot');
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // expire in 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {



///////////   MAIL TRANSPORTER   ///////////
  var port = process.env.MAIL_PORT
  var useremail = process.env.MAIL_USERNAME
  var passwords = process.env.MAIL_PASSWORD
  var transporter = nodemailer.createTransport({
    host: 'mail.isithelo.com',
    tls: {
      rejectUnauthorized: false
    },
      secure: false, // secure:true for port 465, secure:false for port 587
      auth: {
        user: useremail,
        pass: passwords,
      }
    }); 
///////////   MAIL TRANSPORTER   ///////////


      var mailOptions = {
        to: user.email,
        from: 'The '+sitename+' Team' + ' ' + '<'+ process.env.MAIL_USERNAME + '>', // sender address
        subject: '✔ Reset your password on '+sitename+'',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'An email has been sent to ' + user.email + ' with further instructions.' });
        res.redirect('/forgot');
      });
    }
    ]);
};

/**
 * GET /reset
 */
 exports.resetGet = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User.findOne({ passwordResetToken: req.params.token })
  .where('passwordResetExpires').gt(Date.now())
  .exec(function(err, user) {
    if (!user) {
      req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot');
    }
    res.render('account/reset', {
      pagetitle: 'Password Reset | '+sitename+''
    });
  });
};

/**
 * POST /reset
 */
 exports.resetPost = function(req, res, next) {
  req.assert('password', 'Password must be at least 8 characters long').len(8);
  req.assert('confirm', 'Passwords must match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function(done) {
      User.findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .exec(function(err, user) {
        if (!user) {
          req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
          return res.redirect('back');
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        from: 'The '+sitename+' Team' + ' ' + '<'+ process.env.MAIL_USERNAME + '>', // sender address
        to: user.email,
        subject: 'Your '+sitename+' password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('success', { msg: 'Your password has been changed successfully.' });
        res.redirect('/account');
      });
    }
    ]);
};
