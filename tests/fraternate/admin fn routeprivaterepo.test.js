///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();
var app = 'localhost:'+process.env.LOCALHOSTPORT
describe('Testing of the route for private repository.', function() {
	it('upgrade_payfast - this page was superceded.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/billing/upgrade_payfast').then(response => {
			expect(response.statusCode).toBe(404)
			done();
		});
	}); 

	it('/profile Should bounce due to no user logged in.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/profile').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('/account Should bounce due to no user logged in.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/account').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('/organizations Should bounce due to no user logged in.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/organizations').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('/billing Should bounce due to no user logged in.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/billing').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 

	it('/profile Security Bypass.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/profile/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	it('/account Security Bypass.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/account/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	it('/organizations Security Bypass.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/organizations/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	it('/billing Security Bypass.', function(done) {
		request(app)
		.get('/users/JonDavies/settings/billing/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 


});
