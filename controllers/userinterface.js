 
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
