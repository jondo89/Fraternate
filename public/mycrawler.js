const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('localhost:5000', {
  stripQuerystring: false
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});

// start the crawler
generator.start();