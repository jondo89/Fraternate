///////////////////////////////////////////////////////////////////
////      CHECK THE .ENV DEBUG MODE - USER PERMISSIONS        //// 
//////////////////////////////////////////////////////////////////
var dotenv = require('dotenv');
dotenv.config()
if (process.env) {
if (process.env.DEBUG =='true') {
  var debugging = true//turn on or off for debugging.
  //console.log('DEBUGGING IS ACTIVE - HEAVYLIFTING LOADING WITH NO USER PERMISSIONS.')
  var code = 200 // Code good
} else {
  var debugging = false//turn on or off for debugging.
  //console.log('PRODUCTION ENVIROMENT.')
  var code = 302 // Redirect to the login page.
}
}



const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
//////////////////////////////////////////////////////////////
////       GET THE HEAVYLIFTING DATABASE STRUCTURE        //// 
//////////////////////////////////////////////////////////////
const fs = require('fs');//use the file system plugin 
var rawdata = fs.readFileSync('./heavylifting.json'); // get the heavylifting json and parse into an object for use.
var collections = JSON.parse(rawdata); 
var collectionsDesc = collections.descriptions
collections = collections.collections
var testlist1=[]
var testlist2=[]
var testlist3=[]
var testlist4=[]
var testlist5=[]
//console.log('collections',collections)
for(key in collections){
  testlist1.push( '/'+key+'/primary/58aa74140b9d3241280ecf17') 
}
for(key in collections){
  testlist2.push( '/'+key+'/primary/58aa74150b9d3241280ecf18') 
}
for(key in collections){
  testlist3.push( '/'+key+'/primary/58aa74130b9d3241280ecf16') 
}
for(key in collections){
  testlist4.push( '/'+key+'/primary/58d2010b118e812d18654119') 
}
for(key in collections){
  testlist5.push( '/'+key+'/raw/58d2010b118e812d18654119') 
}
describe('Check search endpoints for functionality.', function() {
  test.each(testlist1)(
    "given %p endpoint should return a success.",
    async (firstArg,done) => {
      request(app)
      .get(firstArg)
      .expect(code)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    }
    ); 
  test.each(testlist2)(
    "given %p endpoint should return a success.",
    async (firstArg,done) => {
      request(app)
      .get(firstArg)
      .expect(code)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    }
    ); 
  test.each(testlist3)(
    "given %p endpoint should return a success.",
    async (firstArg,done) => {
      request(app)
      .get(firstArg)
      .expect(code)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    }
    ); 
  test.each(testlist4)(
    "given %p endpoint should return a success.",
    async (firstArg,done) => {
      request(app)
      .get(firstArg)
      .expect(code)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    }
    ); 
    test.each(testlist5)(
    "given %p endpoint should return a success.",
    async (firstArg,done) => {
      request(app)
      .get(firstArg)
      .expect(code)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    }
    ); 
});
