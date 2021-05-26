///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
//Run with jest "signin"

//dumbby user 
//username : testing
//email : testing@testuser.com
//password : Domethingstrong@

describe('SIGNIN Signin', function() {
	it('200', function(done) {
		request(app)
		.get('/signin').then(response => {
			expect(response.statusCode).toBe(200)
			done();
		});
	}); 
	it('601 - recapture failure - good data', function(done) {
		request(app)
		.post('/signin')
		.send({     
			"email" : "testing@testuser.com",
			"password" : "Domethingstrong@",
			'g-recaptcha-response':
			'03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
		.expect('Location',"/signin", done);
	});
	it('601 - recapture failure - bad data', function(done) {
		request(app)
		.post('/signin')
		.send({     
			"email" : "testi12123123ng@testuser.com",
			"password" : "Domet123123hingstrong@",
			'g-recaptcha-response':
			'03AGdBq24mO2jJYkqQZgaiOPasdasdkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
		.expect('Location',"/signin", done);
	});
});
