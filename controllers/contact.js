var nodemailer = require('nodemailer');
 
///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

 

/**
 * GET /contact
 */
 exports.contactGet = function(req, res) {
  res.render('contact', {
    pagetitle: 'Contact Us | '+sitename+'',
  });
};

/**
 * POST /contact
 */
 exports.contactPost = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('message', 'Message cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });
  var errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors);
    return res.redirect('/contact');
  }
 
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
  from: req.body.name + ' ' + '<'+ req.body.email + '>', // sender address
  to: process.env.MAIL_USERNAME, // list of receivers
  subject: '✔ Contact form | '+sitename, // Subject line
  html:  req.body.message,
    }
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
var mailOptions = {
  from: 'The '+sitename+' Team' + ' ' + '<'+ process.env.MAIL_USERNAME + '>', // sender address
  to: req.body.email , // list of receivers
  subject: '✔ Contact form submission | '+sitename, // Subject line
  html:  'Thanks for getting in touch , we will get right back to you!',
    }

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
    req.flash('success', { msg: 'Your message was successfully sent!' });
    return res.redirect('/contact');
});
});
};
