//Run with
//node ./public/admin_reviewsitemap.js
const smtaStream = require('sitemap-to-array').stream
const fs = require('fs')
const sitemap = fs.createReadStream('./public/sitemaplocal.xml')
 
var sitemapList = []

smtaStream.on('data', data =>{ 
   // process emitted line
   //console.log(data.toString())
sitemapList.push(JSON.parse(data.toString()))
}).on('end', function() {
   // all the lines read, go on
   console.log('complete',sitemapList)
});
 
var temp = sitemap
  .pipe(smtaStream)
 