 
var User = require('../models/User');

var sitename = "Fraternate"
 
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
