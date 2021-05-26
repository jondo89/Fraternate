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
describe('Testing of the route for orginizations.', function() {
	it('test page not logged in - reroute', function(done) {
		request(app)
		.get('/organization/new').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('test page - bypass the security', function(done) {
		request(app)
		.get('/organization/new/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	//this is where you left off.
	it('create new orginization - no bypass.', function(done) {
		request(app)
		.post('/organization/new')
		.send({     
			"displayname":"testingspecialorginization",
			"email" : "testingspecialuser@thistest.com",
			"business_billing_name" : "testingspecialuser@thistest.com"
		})
		.expect('Location',"/signin", done);
	});
	it('create new orginization - security bypass ( failures could mean duplicate organization should be deleted )', function(done) {
		request(app)
		.post('/organization/new')
		.send({     
			"name":"testingspecialorginization",
			"email" : "testingspecialuser@thistest.com",
			"business_billing_name" : "testingspecialuser@thistest.com",
			"testing":true
		})
		.expect('Location',"/organization/new-payfast-step2/testingspecialorginization", done);
	});
	it('step2 test page not logged in - reroute', function(done) {
		request(app)
		.get('/organization/new-payfast-step2/testingspecialorginization').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('step2 test page - bypass the security', function(done) {
		request(app)
		.get('/organization/new-payfast-step2/testingspecialorginization/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	it('step3 test page not logged in - reroute', function(done) {
		request(app)
		.get('/organization/new-payfast-step3/testingspecialorginization').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('step3 test page - bypass the security', function(done) {
		request(app)
		.get('/organization/new-payfast-step3/testingspecialorginization/?testing=true').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	it('new-payfast-step3 test with good data , and no bypass on security', function(done) {
		request(app)
		.post('/organizations/testingspecialorginization/?_method=PUT')
		.send({     
			"name":"displayname",
		})
		.expect('Location',"/signin", done);
	});
	it('new-payfast-step3 test with good data , bypass on security', function(done) {
		request(app)
		.post('/organizations/testingspecialorginization/?_method=PUT')
		.send({     
			"displayname":chance.word({ length: 55 }),
			"description":chance.paragraph({ sentences: 44 }),
			"testing":true
		})
		.expect('Location',"/organizations/testingspecialorginization/people", done);
	});
	it('Leave an orginization - not logged in , no bypass.', function(done) {
		request(app)
		.get('/leaveorganiztion/testingspecialorginization').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 	
	it('Leave an orginization - full security bypass', function(done) {
		request(app)
		.get('/leaveorganiztion/testingspecialorginization/?testing=true').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 		
	it('Search when not logged in should bounce', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/usersearch/s').then(response => {
			expect(response.statusCode).toBe(601)
			done();
		});
	}); 
 	it('Wierd Characters - Search should not break the query', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/usersearch/$$$$$$$$$/?testing=true').then(response => {
			expect(response.statusCode).toBe(605)
			done();
		});
	}); 
 	it('Invitation with out log orginization ownership and log in should bouce.', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/approvereq/JonDavies').then(response => {
			expect(response.statusCode).toBe(605)
			done();
		});
	}); 
	 it('Full security bypass - Jonathan', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/approvereq/Jonathan/?testing=true').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('Full security bypass - KaraboMogotlane', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/approvereq/KaraboMogotlane/?testing=true').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
 

 	 it('kick with out log orginization ownership and log in should bouce.', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/kickorg/Jonathan').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
 	 it('Kick Full security bypass - Jonathan.', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/kickorg/Jonathan/?testing=true').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
 	  	 it('Kick Full security bypass - KaraboMogotlane.', function(done) {
		request(app)
		.get('/organizations/isithelo-mining-products-and-services/kickorg/KaraboMogotlane/?testing=true').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	
		it('Delete Org not logged in - reroute', function(done) {
		request(app)
		.get('/deleteorganiztion/whatever').then(response => {
			expect(response.statusCode).toBe(302)
			done();
		});
	}); 
	it('Delete Org not logged in - bypass security and delete the test user.', function(done) {
		request(app)
		.get('/deleteorganiztion/whatever/?testing=true').expect('Location',"/users/", done);
	}); 
	
});
