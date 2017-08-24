var User = require('../../../models/User');
 //set the plugin controller directory
var directory = '../../../plugins/fraternate/'

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../../../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

////////////////////////////////////////////////////
//////////  BRAINTREE TRANSACTION LIST ////////////
//////////////////////////////////////////////////
exports.stripe = function(req, res) {
  res.render('stripe', {
    pagetitle: 'Stripe | '+sitename+'',
  });
}; 