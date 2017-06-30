///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo
 

/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('home', {
    layout: false
  });
};
