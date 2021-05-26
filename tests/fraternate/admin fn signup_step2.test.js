///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
describe('SIGNUPS2 signup-step2', function() {
  it('302', function(done) {
    request(app)
    .get('/signup-step2').then(response => {
      expect(response.statusCode).toBe(302)
      done();
    });
  }); 
    it('200 - bypass the loggin reroute', function(done) {
    request(app)
    .get('/signup-step2/?testing=true').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  });
});
