 
var User = require('../../../models/User');
var braintree = require("braintree");

////////////////////////////////////////////
///////   BRAINTREE INTEGRATION    ////////
//////////////////////////////////////////
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY
});

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../../../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

//////////////////////////////////
/////  PRIVACY STATEMENT    ///// 
////////////////////////////////
exports.privacy = function(req, res) {
  res.render('../../../views/privacy-statement',{
    pagetitle: 'Privacy | '+sitename+'',
  })
}; 

//////////////////////////////////
/////  TERMS STATEMENT    ///// 
////////////////////////////////
exports.terms = function(req, res) {
  res.render('../../../views/terms-of-service',{
    pagetitle: 'Terms of Service | '+sitename+'',
  })
}; 

//////////////////////
/////  INTRO    ///// 
////////////////////
exports.introduction = function(req, res) {
  res.render('../../../views/introduction',{
    pagetitle: 'An Intro | '+sitename+'',
  })
}; 

////////////////////////////////
/////  TROUBLESHOOTING    ///// 
//////////////////////////////
exports.troubleshooting = function(req, res) {
  res.render('../../../views/troubleshooting',{
    pagetitle: 'Troubleshooting | '+sitename+'',
  })
}; 

/////////////////////////////
/////  INSTALLATION    ///// 
///////////////////////////
exports.installation = function(req, res) {
  res.render('../../../views/installation',{
    pagetitle: 'Installation | '+sitename+'',
  })
};

//////////////////////////
/////  PAYMENTS     ///// 
////////////////////////
exports.payments = function(req, res) {
  res.render('../../../views/payments',{
    pagetitle: 'Payments | '+sitename+'',
  })
};

/////////////////////////////
/////  INTEGRATION     ///// 
///////////////////////////
exports.integration = function(req, res) {
  res.render('../../../views/integration',{
    pagetitle: 'Integration | '+sitename+'',
  })
};

/////////////////////////////
/////  LICENCE         ///// 
///////////////////////////
exports.licence = function(req, res) {
  res.render('../../../views/licence',{
    pagetitle: 'Licence | '+sitename+'',
  })
};

/////////////////////////////////
/////  SPECIFICATIONS      ///// 
///////////////////////////////
exports.specifications = function(req, res) {
  res.render('../../../views/specifications',{
    pagetitle: 'Specifications | '+sitename+'',
  })
};

/////////////////////////////////
/////  css      ///// 
///////////////////////////////
exports.css = function(req, res) {
  res.render('../../../views/css',{
    pagetitle: 'CSS Management | '+sitename+'',
  })
};



