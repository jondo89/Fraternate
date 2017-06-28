/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('home', {
    layout: false
  });
};
