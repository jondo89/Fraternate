const request = require('supertest');
const express = require('express');

var app = 'localhost:4000'


 

//Test if there is a .env configured correctly
test('Testing of the MongoURI - Local Test', function() {
	var mongoose = require('mongoose'); //Required for the User module
	var dotenv = require('dotenv'); //Required for the user module
	dotenv.config() //required for the user module.
	expect(process.env.MONGODB).toBeDefined()
});
 /*
test('Testing of the MongoURI - Heroku Test', function() {
	var mongoose = require('mongoose'); //Required for the User module
	var dotenv = require('dotenv'); //Required for the user module
	dotenv.config() //required for the user module.
	expect(process.env.MONGODB_URI).toBeDefined()
});
 */
test('Ensure that the testing is working correctly.', function() {
	var userController = require('../node_modules/fraternate/controllers/user');
 	expect(userController.testingcheck(1, 2)).toBe(3);
});

////////////////////////////////////
////       HEAVYLIFTING        //// 
//////////////////////////////////

