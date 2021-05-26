///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT

 
describe('Legacy Pages and T&Cs', function() {
  it('200', function(done) {
    request(app)
    .get('/privacy').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  }); 
  it('200', function(done) {
    request(app)
    .get('/terms').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  }); 
  it('200', function(done) {
    request(app)
    .get('/community-guidelines').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/troubleshooting').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/installation').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/payments').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/integration').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/licence').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/specifications').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/payments-paypal').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/payments-payfast').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 
  it('Legacy Pages should be migrated to the fraternate git not NPM', function(done) {
    request(app)
    .get('/domain').then(response => {
      expect(response.statusCode).toBe(404)
      done();
    });
  }); 


});
