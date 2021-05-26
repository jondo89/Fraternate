const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

////////////////////////////////////////////////////////////////////////
////       TEST ALL CRUD OPTIONS FOR HEAVYLIFTING - DUMMYDB        //// 
//////////////////////////////////////////////////////////////////////

var duplicateSlug = chance.word({ length: 55 })

var workingEntry2 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'Testing to solve duplicate slug issue.',
    descriptionpage: 'Testing to solve duplicate slug issue.',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0),
        slug: duplicateSlug,
  },
  name:  'Testing to solve duplicate slug issue.',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
  _id: ""
}

var workingEntry3 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'Testing to solve duplicate slug issue.',
    descriptionpage: 'Testing to solve duplicate slug issue.',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0),
        slug: duplicateSlug,
  },
  name:  'Testing to solve duplicate slug issue.',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
  _id: ""
}
  //Check if the get ajax user picuture is returning the test case.
  describe('Testing to solve duplicate slug issue.', function() {
   test('Testing to solve duplicate slug issue.', function(done) {
    request(app)
    .post('/dummydb/admincreatenavigation')
    .send(workingEntry2)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  }); 
      test('Testing to solve duplicate slug issue.', function(done) {
    request(app)
    .post('/dummydb/admincreatenavigation')
    .send(workingEntry3)
    .expect(600)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  }); 
 });