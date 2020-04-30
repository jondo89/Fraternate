const request = require('supertest');
const express = require('express');

 
var app = 'localhost:4000'
 

//////////////////////////////////////////////////S
////       TEST ALL STATIC HTML PAGES        //// 
////////////////////////////////////////////////


var siteIndex = [{
  url: '/issues/view',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/issues/new/sitewide',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/issues/new/',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
}]
 
  
 
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
	if (siteIndex[i].requireslogin==false) {
	testlist.push(siteIndex[i].url)	
	}
	 
}
 
const cases = testlist
describe.skip("End point testing of Fraternate sitemap", () => {
  test.each(cases)(
    "given %p endpoint should return a 200.",
    async (firstArg,done) => {
      request(app)
      .get(firstArg)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.statusCode).toBe(200)
          expect(res.body.pagetitle).not.toBeUndefined();
          done();
        });
    }
  );
}); 

