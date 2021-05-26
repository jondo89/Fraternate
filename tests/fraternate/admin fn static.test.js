///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT

 
describe('User and orginization page testing.', function() {
  it('200', function(done) {
    request(app)
    .get('/privacy').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  }); 

});
