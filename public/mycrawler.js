const SitemapGenerator = require('sitemap-generator');
const localhost = 'localhost:4000'
const siteName ='https://fraternate.herokuapp.com'
// create generator
const generator = SitemapGenerator(siteName, {
  stripQuerystring: false,
  filepath: './public/sitemap.xml',
});
const sitemap = generator.getSitemap()
// register event listeners
generator.on('start', () => {
  // sitemaps created
  sitemap.addURL('/issues/view/')
});

generator.on('error', (error) => {
  console.log(error);
  // => { code: 404, message: 'Not found.', url: 'http://example.com/foo' }
});
 

// start the crawler
generator.start();