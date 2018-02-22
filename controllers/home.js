var User = require('../models/User');
//set the plugin controller directory
 
///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo
 

///////////////////////////////////////
////       HOME CONTROLLER        //// 
/////////////////////////////////////
exports.index = function(req, res) {
//Perform Routing for Varios user type on the home page.
if (req.user) {
    res.render('splash', {
		organizations : req.organizations,
		organizationsParse:req.organizationsParse,
    	pagetitle: req.user.username +' | '+sitename+'',
      userorgcomplist:req.userorgcomplist,
      userorgcomplistParse:req.userorgcomplistParse,
      componentlist : req.componentlist,
      componentlistParse : req.componentlistParse,
      componentlistall : req.componentlistall,
      componentlistParseall : req.componentlistParseall,
      items:req.items, //list of all heavy-lifting DB entires
      itemsParse:req.itemsParse,//list of all heavy-lifting DB entires
      homejs : 'home'
    });
} else {
 
  res.render('home', {
    layout: false
  });
}
};

 