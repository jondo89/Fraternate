 
var User = require('../models/User');

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo
 

 
//////////////////////////////////
/////  PRIVACY STATEMENT    ///// 
////////////////////////////////
exports.privacy = function(req, res) {
res.render('privacy-statement',{
      pagetitle: 'Privacy | '+sitename+'',
})
}; 

//////////////////////////////////
/////  TERMS STATEMENT    ///// 
////////////////////////////////
exports.terms = function(req, res) {
res.render('terms-of-service',{
      pagetitle: 'Terms of Service | '+sitename+'',
})
}; 

//////////////////////////////////////
/////  INSTALL INSTRUCTIONST    ///// 
////////////////////////////////////
exports.install = function(req, res) {
res.render('install',{
      pagetitle: 'Terms of Service | '+sitename+'',
})
}; 
