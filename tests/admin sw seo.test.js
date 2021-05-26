///////////////////////////////////////////////////
////////// LOOK AT THE SEO ON THE SITE ////////////
///////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
var myModule = require('../app.json');
var expected = myModule.website
describe('Check if the seo set up files are available.', function() {
  it('Return a check on the robot.txt file , ensure that the site map location is correct.', function(done) {
      const fs = require('fs');//use the file system plugin 
      var rawdata = fs.readFileSync('./public/robots.txt'); // get the heavylifting json and parse into an object for use.
      expect(rawdata.toString()).toEqual(expect.stringContaining(expected));//Make sure the file is defined.
      done();
    });
  it('Return a check on the sitemap.xml file', function(done) {
      const fs = require('fs');//use the file system plugin 
      var rawdata = fs.readFileSync('./public/sitemap.xml'); // get the heavylifting json and parse into an object for use.
      expect(rawdata.toString()).toEqual(expect.stringContaining(expected));//Make sure the file is defined.
      done();
    });
});