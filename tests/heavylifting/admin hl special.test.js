const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

  //Check if the get ajax user picuture is returning the test case.
  describe('CRUD TESTING NAVIGATION - HEAVYLIFTING.', function() {
    test('Special routing - heavylifting , call image by parentid and text.', function(done) {
      request(app)
      .get('/database/getitem/byparent/Supplier/5900826a5f6dde2ce002e87c/Brelko Conveyor Products')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        //console.log(res)
        done();
      });
    });   
   test('Special routing - heavylifting , call image by ids.', function(done) {
    request(app)
    .get('/database/getitem/byid/591bd19123ccb623685baf9d')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
       //console.log(res)
      done();
    });
  });  
 });