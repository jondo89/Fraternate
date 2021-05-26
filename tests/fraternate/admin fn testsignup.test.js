///////////////////////////////////////////////////////
////////// MULTIPLE SERVER CRASH ATTEMPTS ////////////
/////////////////////////////////////////////////////
const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
describe('SIGNUP formpage', function() {
  it('200', function(done) {
    request(app)
    .get('/signup').then(response => {
      expect(response.statusCode).toBe(200)
      done();
    });
  }); 
  it('601 - recapture failure - good data', function(done) {
    request(app)
    .post('/signup')
    .send({     
      "email" : "testing@testuser.com",
      "password" : "Domethingstrong@",
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect(601)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
  it('601 - recapture failure - bad data', function(done) {
    request(app)
    .post('/signup')
    .send({     
      "email" : "testi12123123ng@testuser.com",
      "password" : "Domet123123hingstrong@",
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPasdasdkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect(601)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('601 - Delete User - with bypass security', function(done) {
    request(app)
    .delete('/account')
    .send({     
      "testing":true,
      "username":"testingSpecialUser"
    })
    .expect(601).end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('create new user testing bypass of the recapture ( failures could mean duplicate user should be deleted )', function(done) {
    request(app)
    .post('/signup')
    .send({     
      "username":"testingSpecialUser",
      "email" : "testingspecialuser@thistest.com",
      "password" : "Domet123123hingstrong@",
      "testing":true,
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPasdasdkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect('Location',"/signup-step2", done);
  });

  it('Check duplicate username creation', function(done) {
    request(app)
    .post('/signup')
    .send({     
      "username":"testingSpecialUser",
      "email" : "testingspecialuser@thistest.com",
      "password" : "Domet123123hingstrong@",
      "testing":true,
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPasdasdkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect('Location',"/signup", done);
  });


//failed first run + second.
//cannot be run out of order , user is deleted below.
//ran a few more times then worked.
  it('302 - testing post active. Should change password correctly and redirect home.', function(done) {
    request(app)
    .post('/reset/b41f0869721d04688f0ee4a458abab32')
    .send({
      "password" : "ygN2Q5pG4nrCUdHC1",
      "confirm":"ygN2Q5pG4nrCUdHC1",
      "testing" :true,
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect(302)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });





//Going into the Reset page routing from here.
it('302 on page + token old so redirect', function(done) {
  request(app)
  .get('/reset/b41f0869721d04688f0ee4a458abab32').then(response => {
    expect(response.statusCode).toBe(302)
    done();
  });
});
//Going into the Reset page routing from here.
it('200 - with testing bypass on token age.', function(done) {
  request(app)
  .get('/reset/b41f0869721d04688f0ee4a458abab32?testing=true').then(response => {
    expect(response.statusCode).toBe(200)
    done();
  });
});

  it('602 - failure on post with wrong token ', function(done) {
    request(app)
    .post('/reset/b41f0869721d04688f0ee4a458abab32')
    .send({
      "password" : "ygN2Q5pG4nrCUdHC1",
      "confirm":"ygN2Q5pG4nrCUdHC1",
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect(602)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('302 - recapture bypass - good data', function(done) {
    request(app)
    .post('/signin')
    .send({     
      "email" : "testingspecialuser@thistest.com",
      "password" : "ygN2Q5pG4nrCUdHC1",
      "testing" :true,
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect('Location', '/', done);
  });
    it('302 - recapture bypass - slightly bad data', function(done) {
    request(app)
    .post('/signin')
    .send({     
      "email" : "testingspecialuser@thistest.com",
      "password" : "ygN2Q5pG4nrCUdHC11",
      "testing" :true,
      'g-recaptcha-response':
      '03AGdBq24mO2jJYkqQZgaiOPkb3LLwUdLwx-J56Fg8wpxJzIVNF-samq67eCLTyZ7u9JCW_RzW_MTLncNZl7GgSJZKjODZR3zCUtJQKyowFx1D8ImcAG8Kgi1ckBw51LFdv0MTfHGBMa44l8zrAHrX8zjBH7s0Q4jDjRP04Udlhz6XTYIlAYNfLa7aI4eYEeAcz63IV_jp0pu1ORRW0yJzRk5pyDj6P5k9ure_9xoz6DCJmNmA3gnUHhiMuT4YUq83mByyBEo483l4a8FV8hDz_V63z0_JE5PfHNOt8oHqpD4Tf6xA1GfgzJhxCIOuURBfki7BOW9d9xQuQoHj2YKEHunVTdWyqfFg8E4fiH8Ow24kYhi-Iw-NWscSuu3QqpGNPjJQNe1JGxcNYlB6_doNEEY8Nq0ev6Fo2g'})
    .expect('Location',"/signin", done);
  });




 

  
  it('Delete User - Fail due to security', function(done) {
    request(app)
    .delete('/account')
    .expect('Location',"/signin", done);
  });
  it('601 - Delete User - with bypass security', function(done) {
    request(app)
    .delete('/account')
    .send({     
      "testing":true,
      "username":"testingSpecialUser"
    })
    .expect(601).end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
 
});
