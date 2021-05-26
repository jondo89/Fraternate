const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
 

//Hack list
var siteIndex = [
  {
    "loc": "/www/wp-includes/wlwmanifest.xml"
  }

]

 
  
 
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
	testlist.push(siteIndex[i].loc)	
}

describe("hackresist - to make the site more hack resistant", () => {
  test.each(testlist)(
    "given %p endpoint should return a 404.",
    async (firstArg,done) => {
    request(app)
      .get(firstArg)
      .expect('Content-Type', /charset=utf-8/)
      .expect(404, done);
    }
  );
});


