const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
 
////////////////////////////////////////////////////////////////////////////////////
////       TEST ALL STATIC HTML PAGES FOR HTML ERROR CODES ON THE MONGO        //// 
//////////////////////////////////////////////////////////////////////////////////

//List of strings to search for on the HTML.
var siteErrors = {
  "HVEC00000000001":"No icon",
  "HVEC00000000002":"no query.entry.descriptionpage",
  "HVEC00000000003":"no query.name",
  "HVEC00000000004":"no route",
  "HVEC00000000005":"no collection",
  "HVEC00000000006":"no site name",
  "HVEC00000000007":"no page title",
  "HVEC00000000008":"no page description",
  "HVEC00000000009":"No res.locals.routeSet",
  "HVEC00000000010":"No query.entry.slug used for SEO , require open and re-save",
  "HVEC00000000101":"No icon",
  "HVEC00000000102":"no query.entry.descriptionpage",
  "HVEC00000000103":"no query.name",
  "HVEC00000000104":"no route",
  "HVEC00000000105":"no collection",
  "HVEC00000000106":"no site name",
  "HVEC00000000107":"no page title",
  "HVEC00000000108":"no page description",
  "HVEC00000000109":"No res.locals.routeSet",
  "HVEC00000000110":"No raw detail"
}

var siteIndex = [
  {
    "loc": "/gameform/5f07e1bfc6df02c16470b6a6"
  }
]
 
var stringList=[]
for (key in siteErrors) {
  stringList.push(key) 
}
  
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
	testlist.push(siteIndex[i].loc)	
}
 
 

describe.skip("End point testing of sitemap", () => {
  test.each(testlist)(
    "given %p the following errors where found.",
    async (firstArg,done) => {
    request(app)
      .get(firstArg)
      .expect('Content-Type', /charset=utf-8/)
        .end(function(err, res) {
        if (err) return done(err);
        //console.log(res.text)
        for (var i = 0; i < stringList.length; i++) {
          expect((res.text).toString()).not.toMatch(stringList[i]);
        }         
        done();
      });
    }
  );
});

