const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT

describe('POST /org; try break the login', function() {
  it('This is a fake login with good credentials , and should fail', function(done) {
    request(app)
      .post('/organizations/new-payfast')
      .send({     "email" : "testing@testuser.com",
    "password" : "somethingstrong",
  'g-recaptcha-response':
   '03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});