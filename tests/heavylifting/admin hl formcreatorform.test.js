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

var workingEntryformcreator2 = {
  active: "true",
  detail: chance.paragraph({ sentences: 2 }),
  elementID: "",
  entry: {description:chance.word({ length: 15 }),detail:chance.paragraph({ sentences: 2 }) ,order: "1"},
  form: "navform",
  name: "Create an element that will be a form field.",
  parentid: "58aa74140b9d3241280ecf21",
  revision: "created",
}
  //Check if the get ajax user picuture is returning the test case.
  describe('CRUD TESTING NAVIGATION - HEAVYLIFTING.', function() {
   test('Create a new form element.', function(done) {
    request(app)
    .post('/dummydb/admincreateformcreator')
    .send(workingEntryformcreator2)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  }); 

 });