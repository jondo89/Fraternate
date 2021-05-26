
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
  testlist.push( '/'+key+'/query/getinitforms/') 
}

describe('Check details on the heavylifting initialization forms for data quality.', function() {

 test.each(testlist)(
  "given %p endpoint should return boolean test of true for presence of forms and qty check on forms.",
  async (firstArg,done) => {
    request(app)
    .get(firstArg)
    .end(function(err, res) {
    // console.log(res.text)
     var collectionQuery = JSON.parse(res.text)

//Boolean test for the presence of the forms, if they dont exist flag issue.
var boolTest1 = false
var boolTest2 = false
var boolTest3 = false
var boolTest4 = false
var boolTest5 = false
for (var i = 0; i < collectionQuery.collection.length; i++) {
if(collections[collectionQuery.collectionname]['rawform']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['rawform']==collectionQuery.collection[i]._id){
  boolTest1=true
}
if(collections[collectionQuery.collectionname]['parentids']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['parentids']==collectionQuery.collection[i]._id){
  boolTest2=true
}
if(collections[collectionQuery.collectionname]['navigationform']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['navigationform']==collectionQuery.collection[i]._id){
  boolTest3=true
}
 if(collections[collectionQuery.collectionname]['primaryform']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['primaryform']==collectionQuery.collection[i]._id){
  boolTest4=true
}
  if(collections[collectionQuery.collectionname]['formcreator']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['formcreator']==collectionQuery.collection[i]._id){
  boolTest5=true
}
}

//check the booleans , flag false as a fail.
    if (!boolTest1) {
    throw new Error(`rawform could not be found  | `+ collectionQuery.collectionname)
    }
    if (!boolTest2) {
    throw new Error(`parentids could not be found, there may be a bug here turning the active to false. | `+ collectionQuery.collectionname)
    }
    if (!boolTest3) {
    throw new Error(`navigationform could not be found | `+ collectionQuery.collectionname)
    }
    if (!boolTest4) {
    throw new Error(`primaryform could not be found | `+ collectionQuery.collectionname)
    }
    if (!boolTest5) {
    throw new Error(`formcreator could not be found | `+ collectionQuery.collectionname)
    }


var count1 = 0
var count2 = 0
var count3 = 0
var count4 = 0
var count5 = 0

//loop the colection and check the number of mathces on each form.
for (var i = 0; i < collectionQuery.collection.length; i++) {
if(collections[collectionQuery.collectionname]['rawform']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['rawform']==collectionQuery.collection[i]._id){
  count1+=1
}
if(collections[collectionQuery.collectionname]['parentids']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['parentids']==collectionQuery.collection[i]._id){
 count2+=1
}
if(collections[collectionQuery.collectionname]['navigationform']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['navigationform']==collectionQuery.collection[i]._id){
  count3+=1
}
 if(collections[collectionQuery.collectionname]['primaryform']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['primaryform']==collectionQuery.collection[i]._id){
  count4+=1
}
  if(collections[collectionQuery.collectionname]['formcreator']==collectionQuery.collection[i].elementID || collections[collectionQuery.collectionname]['formcreator']==collectionQuery.collection[i]._id){
  count5+=1
}
}

//Check the quantities of matches , and flag errors..
    if (count1>1) {
    throw new Error(`rawform count should not be greater than 1 | it is currently : ` + count1 + ' | '+ collectionQuery.collectionname)
    }
    if (count2>1) {
    throw new Error(`parentids count should not be greater than 1 | it is currently : ` + count2 + ' | '+ collectionQuery.collectionname)
    }
    if (count3>1) {
    throw new Error(`navigationform count should not be greater than 1 | it is currently : ` + count3 + ' | '+ collectionQuery.collectionname)
    }
    if (count4>1) {
    throw new Error(`primaryform count should not be greater than 1 | it is currently : ` + count4 + ' | '+ collectionQuery.collectionname)
    }
    if (count5>1) {
    throw new Error(`formcreator count should not be greater than 1 | it is currently : ` + count5 + ' | '+ collectionQuery.collectionname)
    }
     if (err) return done(err);
     done();
   });
  }
  );
});