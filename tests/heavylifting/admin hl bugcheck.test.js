const request = require('supertest');
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var app = 'localhost:'+process.env.LOCALHOSTPORT
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

////////////////////////////////////////////////////////////////////////
////       TEST ALL CRUD OPTIONS FOR HEAVYLIFTING - DUMMYDB        //// 
//////////////////////////////////////////////////////////////////////



  //Check if the get ajax user picuture is returning the test case.
describe('Look for css and javascript.', function() {
test('Route testing', function(done) {
request(app)
.get('/components/query/default/5a4cba3f6f44d54584a5fb89').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/css/custom.css').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/css/quillbootstrap.css').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/proton/style.css').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/js/bundle.js').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/img/Logo%20square%20inverse%2050x50.png').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/components/formcontrol/singleDataTableCall?data=5a4cba3f6f44d54584a5fb89').then(response => {
expect(response.statusCode).toBe(200)
done();
});
}); 
test('Route testing', function(done) {
request(app)
.get('/components/formcontrol/getform?formdata=5a4cba8c6f44d54584a5fb8d&idItem=&parentid=5a4cba3f6f44d54584a5fb89&headings=[%22description%22,%22detail%22,%22icon%22,%22headings%22]&entry={%22elementID%22:%22%22}').then(response => {
expect(response.statusCode).toBe(200)
done();
});
});
test('Route testing', function(done) {
request(app)
.get('/components/formcontrol/getdatacomp?formdata=5a4cba8c6f44d54584a5fb8d&idItem=&raw=component').then(response => {
expect(response.statusCode).toBe(200)
done();
});
});
test('Route testing.', function(done) {
request(app)
.get('/components/formcontrol/findme?ids=5a4cba3f6f44d54584a5fb89').then(response => {
expect(response.statusCode).toBe(200)
done();
});
});
test('Route testing.', function(done) {
request(app)
.get('/components/formcontrol/getformfieldArray?data=59008f291f713b350cab33a5').then(response => {
expect(response.statusCode).toBe(200)
done();
});                  
}); 

test('Route testing.', function(done) {
request(app)
.get('/components/parentiddata?ids=5d691aba3ac0a04a083b7a50').then(response => {
expect(response.statusCode).toBe(404)
done();
});                  
}); 
test('Route testing.', function(done) {
request(app)
.get('/components/calculations/parentiddata/5d691aba3ac0a04a083b7a50').then(response => {
expect(response.statusCode).toBe(200)
done();
});                  
}); 
test('Font awesome.', function(done) {
request(app)
.get('/css/all.css').then(response => {
expect(response.statusCode).toBe(200)
done();
});                  
}); 
test('Bootstrap.', function(done) {
request(app)
.get('/css/bootstrap.min.css').then(response => {
expect(response.statusCode).toBe(200)
done();
});                  
}); 
test('Jquery.', function(done) {
request(app)
.get('/jquery.min.js').then(response => {
expect(response.statusCode).toBe(200)
done();
});                  
}); 
test('bootstrap javascript.', function(done) {
request(app)
.get('/js/bootstrap.min.js').then(response => {
expect(response.statusCode).toBe(200)
done();
});                  
}); 


});














