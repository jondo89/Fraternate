///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT

describe('signup-step3', function() {
  it('302', function(done) {
    request(app)
    .get('/signup-step3').then(response => {
      expect(response.statusCode).toBe(302)
      done();
    });
  }); 
  it('200 - bypass the loggin reroute', function(done) {
    request(app)
    .get('/signup-step3/?testing=true').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  });
  it('post bad data - not loggin', function(done) {
    request(app)
    .put('/account')
    .send({     
      "name" : "boobs"
    })
    .expect('Location',"/signin", done);
  });
  it('Bypass all security , post user changes.', function(done) {
    request(app)
    .put('/account')
    .send({     
      "email":"signup-step3@ignup-step3.com",
      "name" : "test worked",
      "testing":true,
    })
    .expect('Location',"/users/asd", done);
  });
});
