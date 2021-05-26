const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
 
//////////////////////////////////////////////////
////       TEST ALL STATIC HTML PAGES        //// 
////////////////////////////////////////////////

var siteIndex = [
  {
    "loc": "/semini/formoverwriteall"
  }
]
 
  
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
	testlist.push(siteIndex[i].loc)	
}

describe.skip("This rewrites the 4 forms for all of the collections.", () => {
  test.each(testlist)(
    "given %p endpoint should return a 200.",
    async (firstArg,done) => {
    request(app)
      .get(firstArg)
      .expect('Content-Type', /charset=utf-8/)
      .expect(200, done);
    }
  );
});


