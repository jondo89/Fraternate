/////////////////////////////////////////////////////////////////////////////////////////
////////// ENSURE THAT THERE IS A PORT LISTED FOR THE LOCAL HOST IN THE .ENV ////////////
/////////////////////////////////////////////////////////////////////////////////////////
describe('Check if there is a .ENV file.', function() {
  it('Return a value for the .env', function(done) {
    var dotenv = require('dotenv');
    dotenv.config()
    expect(process.env.LOCALHOSTPORT).toBeDefined();
    done();
  });
});

describe('Check if there is a heavylifting.json file.', function() {
  it('Return a check on the heavylifting.json file', function(done) {
      const fs = require('fs');//use the file system plugin 
      var rawdata = fs.readFileSync('./heavylifting.json'); // get the heavylifting json and parse into an object for use.
      var collections = JSON.parse(rawdata); 
      var collectionsDesc = collections.descriptions
      collections = collections.collections
      expect(collections).toBeDefined();//Make sure the file is defined.
    done();
  });
});


