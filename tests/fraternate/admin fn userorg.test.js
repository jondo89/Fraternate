///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT

 
describe('Userpage', function() {
  it('users 200', function(done) {
    request(app)
    .get('/users').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  });  
  it('organizations 200', function(done) {
    request(app)
    .get('/organizations').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  });  
  it('users 200', function(done) {
    request(app)
    .get('/users/JonDavies').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  }); 
  it('Bad request for user.', function(done) {
    request(app)
    .get('/users/:$^%$#$%^^%$').then(response => {
      expect(response.statusCode).toBe(302)
      done();
    });
  }); 

});
