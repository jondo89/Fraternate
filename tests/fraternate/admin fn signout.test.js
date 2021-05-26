///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
describe('SIGNOUT signout', function() {
  it('200', function(done) {
    request(app)
    .get('/signout').then(response => {
      expect(response.statusCode).toBe(302)
      done();
    });
  }); 
});
