var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var organizations;
var express = require('express');
var app = express();


///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

var schemaOptions = {
	collection: 'organizations' ,
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var organizationsSchema = mongoose.Schema({
  'name' :{ type: String, default: 'Inital Form' },
  'detail' :String,
  'objectType' :String,
//child type will be a form id , used for determining what component is created by the form.
'childType' :String,
//Used for the routing of new posts
'route' :String,
'entry' :Schema.Types.Mixed,
'parentid' :String,
'name' :String,
'elementID' :{ type: String, default: '' },
'userID' :String,
'revision' :{ type: String, default: 'created' },
'created' : { type: Date, default: Date.now },
'active' : { type: String, default: "true" },
}, schemaOptions);


///////////////////////////////////////
////     SIGN UP EMAIL SEND       //// 
/////////////////////////////////////
function signupEmail(organizations){
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
  from: organizations.entry.name + ' ' + '<'+ organizations.entry.email + '>', // sender address
  to: process.env.MAIL_USERNAME, // list of receivers
  subject: '✔ A user has edited an organization. | '+ sitename, // Subject line
  html:  '<h2>The following organization has been edited.</h2><p>Code :</p> <pre>'+organizations+'</pre>',
}
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
});
}

/////////////////////////////////
////     PRESAVE AREA       //// 
///////////////////////////////
organizationsSchema.pre('save', function(next) {
  var organizations = this;
  signupEmail(organizations)
	next();
});


organizationsSchema.virtual('gravatar').get(function() {
  if (!this.get('email')) {
    return 'https://gravatar.com/avatar/?s=200&d=retro';
  }
  var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});


var Organizations = mongoose.model('organizations', organizationsSchema);

module.exports = Organizations;