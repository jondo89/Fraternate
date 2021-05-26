
//run with jest -t 'workspacetesting'
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
    "loc": "/workspace/id/60615c461f89bacdc4fc2c72",
    "notes" : " This haes been added to ensure that unasal edits that show up on the workspace page are viewable."
  },
{
    "loc": "/workspace/id/5b1644dd9d81344ba4548f47",
    "notes" : "This should redirect to the assumptions page."
  },{
    "loc": "/workspace/id/591005ddd0c87d43a49513fc",
    "notes" : "this was a great failure picked up , this should not crash the server."
  },





]
 
  
 
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
  testlist.push(siteIndex[i].loc) 
}

describe("workspacetesting - Minimum End point testing of workspace testing", () => {
  test.each(testlist)(
    "given %p endpoint should return a 302.",
    async (firstArg,done) => {
    request(app)
      .get(firstArg)
      .expect('Content-Type', /charset=utf-8/)
      .expect(302, done);
    }
  );
});


