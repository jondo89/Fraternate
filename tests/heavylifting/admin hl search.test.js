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
var testlist=[]
//console.log('collections',collections)
for(key in collections){
	testlist.push( '/'+key+'/search/') 
}
var testlistSearch=[]
//console.log('collections',collections)
for(key in collections){
	testlistSearch.push( '/'+key+'/search/searchbar/?querykey='+'belt class') 
}
describe('Check search endpoints for functionality.', function() {
	test.each(testlist)(
		"given %p endpoint should return a success.",
		async (firstArg,done) => {
			request(app)
			.get(firstArg)
			.expect('Content-Type', /charset=utf-8/)
			.expect(200, done);
		}
		);
	test.each(testlistSearch)(
		"given %p endpoint ajax seach should return a success.",
		async (firstArg,done) => {
			request(app)
			.get(firstArg)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
			
		}
		);	
});