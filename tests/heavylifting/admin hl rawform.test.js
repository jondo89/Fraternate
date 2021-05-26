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
var navigationtestdata410 = {}
var navigationtestdata416a = {
  active: "true",
  detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
  entry:{
    description: "416 ",
    descriptionpage: "416 ",
    detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "416 ",
  parentid: "",
  revision: "revision",
  _id: "58aa74130b9d3241280ecf16"
}

var navigationtestdata416b = {
  active: "true",
  detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
  entry:{
    description: "416 ",
    descriptionpage: "416 ",
    detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "416 ",
  parentid: "",
  revision: "revision",
  elementID: "58aa74150b9d3241280ecf18"
}

var navigationtestdata416c = {
  active: "true",
  detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
  entry:{
    description: "416 ",
    descriptionpage: "416 ",
    detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "416 ",
  parentid: "",
  revision: "revision",
  _id: "58aa74120b9d3241280ecf15"
}

var navigationtestdata416d = {
  active: "true",
  detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
  entry:{
    description: "416 ",
    descriptionpage: "416 ",
    detail: "416 - Fail routing with protected id usage. Core ids and elementid.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "416 ",
  parentid: "",
  revision: "revision",
  _id: "58aa74140b9d3241280ecf17"
}

var navigationtestdata417 = {
  active: "true",
  detail: "417 - pass a testing variable to the post , with a element id that is blank , to determine if the item is copying the id to the elementid.",
  entry:{
    description: "417 ",
    descriptionpage: "417 ",
    detail: "417 - pass a testing variable to the post , with a element id that is blank , to determine if the item is copying the id to the elementid.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "417 ",
  parentid: "",
  revision: "revision",
  _id: "blablabla",
  testing417 : true
}

var navigationtestdata418 = {
  active: "true",
  detail: "418 - pass a testing variable with an undefined childType to the post to make sure this test is working.",
  entry:{
    description: "418 ",
    descriptionpage: "418 ",
    detail: "418 - pass a testing variable with an undefined childType to the post to make sure this test is working.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "418 ",
  parentid: "",
  revision: "revision",
  _id: "blablabla",
  testing : true
}
var navigationtestdata419 = {
  active: "true",
  detail: "418 - pass a testing variable with an undefined childType to the post to make sure this test is working.",
  entry:{
    description: "418 ",
    descriptionpage: "418 ",
    detail: "418 - pass a testing variable with an undefined childType to the post to make sure this test is working.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "418 ",
  parentid: "",
  revision: "revision",
  _id: "58d2010b118e812d18654119",
  testing419 : true
}
var navigationtestdata420 = {
  active: "true",
  detail: "420 - blank parent ids should fail - that are not he parent id itself.",
  entry:{
    description: "420 ",
    descriptionpage: "420 ",
    detail: "420 - blank parent ids should fail - that are not he parent id itself.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "420 ",
  revision: "revision",
  _id: "boo this thhh",
  testing420 : true
}

var navigationtestdata421 = {
  active: "true",
  detail: "421 - Intitate a check to see if the id or elementid is not the parentid. also check that it is not the parent id for this collection , this should just fail.",
  entry:{
    description: "421 ",
    descriptionpage: "421 ",
    detail: "421 - Intitate a check to see if the id or elementid is not the parentid. also check that it is not the parent id for this collection , this should just fail.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "421 ",
  parentid: "sfsdfsdfsdfsdfs",
  revision: "revision",
  _id: "boo this thhh",
  testing421 : true
}

var navigationtestdata422 = {
  active: "true",
  detail: "422 - The parentid is the same as the element id.",
  entry:{
    description: "422 ",
    descriptionpage: "422 ",
    detail: "422 - The parentid is the same as the element id.",
    headings: [],
    slug: "asd",
    tabs: []
  },
  name: "422 ",
  parentid: "boo this thhh",
  elementID:"boo this thhh",
  revision: "revision",
  _id: "boo this thhh",
  testing421 : true
}

var navigationtestdata423 = {
   active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: '423',
    descriptionpage: '423',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0),
    parent : '5f28e385833bbb1f6cfcaf07'
  },
  name:  '423',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
  childType : '58aa74150b9d3241280ecf18',
  testing423:true
}

var workingEntry1 = {
  active: "true",
  detail:  chance.paragraph({ sentences: 5 }),
  elementID: "",
  entry: {
    description: 'workingEntry1',
    descriptionpage: 'workingEntry1',
    detail: chance.paragraph({ sentences: 5 }),
    headings: Array(0),
    tabs: Array(0)
  },
  name:  'workingEntry1',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
  _id: ""
}

var workingEntry2 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'workingEntry2',
    descriptionpage: 'workingEntry2',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0)
  },
  name:  'workingEntry2',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
  _id: ""
}

var workingEntry3 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'workingEntry3',
    descriptionpage: 'workingEntry3',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0)
  },
  name:  'workingEntry3',
  parentid: "",
  revision: "revision",
  _id: "58d2010b118e812d18654119",
}

var workingEntry4 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'workingEntry4',
    descriptionpage: 'workingEntry4',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0),
    parent : '5f28e385833bbb1f6cfcaf07'
  },
  name:  'workingEntry4',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
}

var workingEntry5 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'workingEntry5',
    descriptionpage: 'workingEntry5',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0)
  },
  name:  'workingEntry5',
  parentid: "58d2010b118e812d18654119",
  revision: "revision",
  _id: "5f28e385833bbb1f6cfcaf07",
}

var workingEntry6 = {
  active: "true",
  detail:  chance.word({ length: 55 }),
  elementID: "",
  entry: {
    description: 'workingEntry6',
    descriptionpage: 'workingEntry6',
    detail: chance.paragraph({ sentences: 55 }),
    headings: Array(0),
    tabs: Array(0),
    parent : 'asdasd'
  },
  name:  'workingEntry6',
  parentid: "58d2010b118e812d18654119",
  revision: "created",
  
}

  //Check if the get ajax user picuture is returning the test case.
  describe('CRUD TESTING NAVIGATION - HEAVYLIFTING.', function() {
  	test.skip('Rewrite the dummydb.', function(done) {
  		request(app)
  		.get('/semini/reinitializedummydb').then(response => {
  			expect(response.statusCode).toBe(200)
  			done();
  		});
  	}); 
  	test('410 - Navigation creation - blank data.', function(done) {
  		request(app)
  		.post('/dummydb/admincreateraw')
  		.send(navigationtestdata410)
  		.expect(410)
  		.end(function(err, res) {
  			if (err) return done(err);
  			done();
  		});
  	});   
   test('416a - Fail routing with protected id usage. Core ids and elementid', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata416a)
    .expect(416)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });  
   test('416b - Fail routing with protected id usage. Core ids and elementid', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata416b)
    .expect(416)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });  
   test('416c - Fail routing with protected id usage. Core ids and elementid', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata416c)
    .expect(416)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });  
   test('416d - Fail routing with protected id usage. Core ids and elementid', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata416d)
    .expect(416)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });  
   test('417 - pass a testing variable to the post , with a element id that is blank , to determine if the item is copying the id to the elementid.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata417)
    .expect(417)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });     
   test('418 - pass a testing variable with an undefined childType to the post to make sure this test is working.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata418)
    .expect(418)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
   test('419 - Intitate a check to see if the id or elementid is the parentid. We dont want this to appear on its own tree , so set the parentid to blank.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata419)
    .expect(419)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
   test('420 - blank parent ids should fail - that are not he parent id itself.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata420)
    .expect(420)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });      
   test('421 - Intitate a check to see if the id or elementid is not the parentid. also check that it is not the parent id for this collection , this should just fail.(declared Legacy )', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata421)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });      

   test('422 - The parentid is the same as the element id.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata422)
    .expect(422)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });      
      test('423 - The id of the heavylifting sytem is being used as childType. Break here.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(navigationtestdata423)
    .expect(423)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });   
   test('Create a new nav tree item.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(workingEntry1)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
   test('Create a new nav tree item very long sentances.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(workingEntry2)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
   test('Edit the primary id.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(workingEntry3)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
   test('Create new for editing.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(workingEntry4)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });   
   test('Edit a field posted previously , This could fail due to non-unique ids being present.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(workingEntry5)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });   
   test('Post a field that should break the navtree.', function(done) {
    request(app)
    .post('/dummydb/admincreateraw')
    .send(workingEntry6)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });  
 });