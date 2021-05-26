const request = require('supertest');
const express = require('express');




//This looks for the presence of these teampltes in the site directory.
var testlist = [
'./views/partials/docs_ajax_splash.handlebars',
'./views/partials/navigation.handlebars',
'./views/partials/topofpage.handlebars',
'./views/404.handlebars',
'./views/500.handlebars',
'./views/contact.handlebars',
'./views/partials/css.handlebars',
'./views/partials/usernav.handlebars',
]



describe('Check presence of Heavylifting templates in the site.', function() {
	test.each(testlist)(
		"given %p endpoint should return boolean test of true for presence of forms and qty check on forms.",
		function(firstArg,done) {
      const fs = require('fs');//use the file system plugin 
      var rawdata = fs.readFileSync(firstArg); // get the heavylifting json and parse into an object for use.
      expect(rawdata).toBeDefined();//Make sure the file is defined.
      done();
  }
  );
});


//This looks for the presence of these teampltes in the site directory - These should not be there.
var testlistNotThere = [
'./views/partials/header.handlebars',
'./views/partials/test.handlebars',
'./views/partials/tools.handlebars',
'./views/partials/tableload.handlebars',
'./views/partials/tablebrowser.handlebars',
'./views/partials/homecss.handlebars',
'./views/partials/button-org-user.handlebars',
]



describe('Check presence of Heavylifting templates in the site - These should not be there.', function() {
	test.each(testlistNotThere)(
		"given %p endpoint should return boolean test of false for presence of forms and qty check on forms.",
		function(firstArg,done) {
			try{
	  const fs = require('fs');//use the file system plugin 
      var rawdata = fs.readFileSync(firstArg); // get the heavylifting json and parse into an object for use.
      expect(rawdata).toBeNaN();//Make sure the file is defined.
      done();
  } catch (err){
  	expect(rawdata).toBeFalsy();
  	done();
  }
}
);
});