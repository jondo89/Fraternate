//Run with
//node ./public/admin_localhostcrawler.js
//this can be run as a concrent task with grunt - this will include a test run of the site map.
//use grunt sitemap in the root directory
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
const SitemapGenerator = require('sitemap-generator');
var localhost = 'localhost:'+process.env.LOCALHOSTPORT

var myModule = require('../app.json');
var expected = myModule.website//Get the app.json details for the website.

// create generator
const generator = SitemapGenerator(localhost, {
  stripQuerystring: false,
  maxDepth: 0,
  baseUrl : expected,
  filepath: './public/sitemap.xml',
  ignore: url => {
    // Prevent URLs from being added that contain `<pattern>`.
    return /semini/g.test(url)
  }
});
const sitemap = generator.getSitemap()
// register event listeners
generator.on('start', () => {
  // sitemaps created
  sitemap.addURL('/issues/view/')
});
generator.on('error', (error) => {
  console.log(error);
  // => { code: 404, message: 'Not found.', url: 'http://example.com/foo' }
});
generator.on('ignore', (url) => {
  // log ignored url
  //console.log('Ignore the following : ',url);
});
generator.on('done', () => {
  // sitemaps created
  RewriteWebAdress()
  //Need to open custom test and test every URL
});
// start the crawler
generator.start();
//Rewrite the app.json website address into the sitemap.
function RewriteWebAdress(){
  const fs = require('fs');//use the file system plugin 
  var rawdata = fs.readFileSync('./public/sitemap.xml','utf8'); // get the heavylifting json and parse into an object for use.
  fs.writeFileSync('./public/sitemaplocal.xml', rawdata);
  const result = rawdata.replace(new RegExp('http://localhost:5000/', "g"), expected+'/')
  fs.writeFileSync('./public/sitemap.xml', result);
  console.log("Create new sitemaplocal.xml complete")
  console.log("Create new sitemap.xml complete")

  //need to write into the admin sw endpoint.test.js to manually insert the sitemap for checking.
}


