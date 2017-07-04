var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true},
  password: String,
  bio: String,
  username: String,
  passwordResetToken: String,
  permission: String,
  passwordResetExpires: Date,
  company: String,
  location: String,
  website: String,
  picture: String,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  vk: String
}, schemaOptions);


///////////////////////////////////////
////     SIGN UP EMAIL SEND       //// 
/////////////////////////////////////
function signupEmail(username , email){
  var port = process.env.MAIL_PORT
  var useremail = process.env.MAIL_USERNAME
  var passwords = process.env.MAIL_PASSWORD
  var temp = {}
  'use strict';
  var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
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
var mailOptions = {
  from: username + ' ' + '<'+ email + '>', // sender address
  to: process.env.MAIL_USERNAME, // list of receivers
  subject: '✔ Your Account modification was successfully completed | '+ sitename, // Subject line
  html:  'Account modification :' + username + ' email : ' +  email,
}
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  var mailOptions = {
  from: 'The '+sitename+' Team' + ' ' + '<'+ process.env.MAIL_USERNAME + '>', // sender address
  to: email, // list of receivers
  subject: '✔ Your Account modification was successfully completed | '+sitename, // Subject line
  html:  'Your account has been successfully modified on '+sitename+' , First time users please complete you profile and account settings when you get a chance!',
}
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
});
});
}


userSchema.pre('save', function(next) {
var user = this;
if (!user.username) {
  user.username = user.name.replace(/\s/g,'')
}
//issues with Github and google blank usernames
if (user.username =="") {
  user.username = user.name.replace(/\s/g,'')
}


signupEmail(user.username , user.email)


  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.virtual('gravatar').get(function() {
  if (!this.get('email')) {
    return 'https://gravatar.com/avatar/?s=200&d=retro';
  }
  var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});

userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
