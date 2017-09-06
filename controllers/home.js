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
 
///////////////////////////////////////
////       HOME CONTROLLER        //// 
/////////////////////////////////////
exports.index = function(req, res) {
	
//Perform Routing for Varios user type on the home page.
if (req.user) {
	res.render('../../../plugins/fraternate/views/splash', {
		organizations : req.organizations,
		organizationsParse:req.organizationsParse,
		pagetitle: req.user.username +' | '+sitename+'',
		sitekey : sitekey
	});
} else {
	res.render('../../../views/home', {
		layout: false
	});
}
};