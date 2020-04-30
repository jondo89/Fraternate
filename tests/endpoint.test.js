const request = require('supertest');
const express = require('express');

 
var app = 'localhost:4000'
 

//////////////////////////////////////////////////
////       TEST ALL STATIC HTML PAGES        //// 
////////////////////////////////////////////////


var siteIndex = [{
  url: '/',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/signin',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/users',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/organizations',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/issues/view',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/issues/view/homepage',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/signup',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/introduction',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/contact',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/terms',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/privacy',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/users/JonDavies',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/organizations/gggggggggg',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/issues/new/test',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : false
},{
  url: '/users/JonDavies/settings/profile',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/users/JonDavies/settings/account',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/users/JonDavies/settings/organizations',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/users/JonDavies/settings/billing',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/organizations/gggggggggg/settings/profile',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/organizations/gggggggggg/settings/member_privileges',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/organizations/gggggggggg/settings/billing',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/organizations/gggggggggg/settings/billing-paypal',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},{
  url: '/organizations/new-payfast',
  lastMod: new Date('2000-02-02'),
  changeFreq: 'weekly',
  requireslogin : true
},]
 
  
 
var testlist=[]
for (var i = 0; i < siteIndex.length; i++) {
	if (siteIndex[i].requireslogin==false) {
	testlist.push(siteIndex[i].url)	
	}
	 
}
 
const cases = testlist
describe("End point testing of sitemap", () => {
  test.each(cases)(
    "given %p endpoint should return a 200.",
    async (firstArg,done) => {
    request(app)
      .get(firstArg)
      .expect('Content-Type', /charset=utf-8/)
      .expect(200, done);
    }
  );
});


