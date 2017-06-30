var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var recaptcha = require('express-recaptcha');

// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var userInterfaceController = require('./controllers/userinterface');

// Passport OAuth strategies
require('./config/passport');

var app = express();

///////////////////////////////////////
///////   FAVICON LOCATION    ////////
/////////////////////////////////////
var favicon = require('serve-favicon');
try {
  app.use(favicon(__dirname + '/public/img/favicon/favicon-16x16.png'));   
} catch (err){
  console.log('Favicon not found in the required directory.')
}


////////////////////////////////////////////////////
///////   HEROKU VS LOCALHOST .ENV SWAP    ////////
//////////////////////////////////////////////////
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(process.env.MONGODB);
}

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

var db = mongoose.connection;
db.once('open', function() {
  // we're connected!
  console.log('mongoose connection ok')
  //compile the schema for mongoose
});

var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    },
    partial: function (name) {
      return name;
    },
    'dotdotdot' : function(str) {
      if (str) {
        if (str.length > 16)
          return str.substring(0,16) + '...';
        return str;}
      },
      'dotdotdotdot' : function(str) {

        if (str) {
          if (str.length > 200)
            return str.substring(0,200) + '...';
          return str;
        }
      }
    }
  });

/////////////////////////////////////////////
///////   HTTPS TRAFFIC REDIRECT    ////////
///////////////////////////////////////////
 // Redirect all HTTP traffic to HTTPS
 function ensureSecure(req, res, next){
  if(req.headers["x-forwarded-proto"] === "https"){
  // OK, continue
  return next();
};
res.redirect('https://'+req.hostname+req.url);
};
// Handle environments
if (app.get('env') == 'production') {
  app.all('*', ensureSecure);
}

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/////////////////////////////////////////////
///////   LOCALHOST PORT SETTING    ////////
///////////////////////////////////////////
app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
var myModule = require('./app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo
app.locals.sitename = sitename
app.locals.website = website
app.locals.repo = repo

/////////////////////////////
////     ROUTING        //// 
///////////////////////////


/////////////////////////////////
////       TEMPALTES        //// 
///////////////////////////////
app.get('/privacy', userInterfaceController.privacy);
app.get('/terms', userInterfaceController.terms);
app.get('/install', userInterfaceController.install);


app.get('/', HomeController.index);
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);
app.get('/account', userController.ensureAuthenticated, userController.accountGet);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.get('/signup', userController.signupGet);
app.post('/signup', userController.signupPost);
app.get('/signin', userController.loginGet);
app.post('/signin', userController.loginPost);
app.get('/forgot', userController.forgotGet);
app.post('/forgot', userController.forgotPost);
app.get('/reset/:token', userController.resetGet);
app.post('/reset/:token', userController.resetPost);
app.get('/signout', userController.signout);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/signin' }));


/////////////////////////////
////       404          //// 
///////////////////////////
app.get('*', function(req, res){
  res.render('404',{layout:false});
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
