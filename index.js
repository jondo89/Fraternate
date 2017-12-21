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
var braintree = require("braintree");

// Load environment variables from .env file
dotenv.load();



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

//////////////////////////////////////////////////
///////   MONGODB INITIATE CONNECTION    ////////
////////////////////////////////////////////////
var db = mongoose.connection;
db.once('open', function() {
  // we're connected!
  console.log('mongoose connection ok')
  //compile the schema for mongoose
});

////////////////////////////////////////////
///////   BRAINTREE INTEGRATION    ////////
//////////////////////////////////////////
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY
});

/////////////////////////////////////////
///////   HANDLEBARS HELPERS    ////////
///////////////////////////////////////
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
      },
      'dotdotdotdotdot' : function(str) {
        if (str) {
          if (str.length > 400)
            return str.substring(0,400) + '...';
          return str;
        }
      },      'dots' : function(str) {
        if (str) {
          if (str.length > 150)
            return str.substring(0,150) + '...';
          return str;
        }
      },
      'profile' : function(str) {
        if (str) {
          if (str.length > 550)
            return str.substring(0,550) + '...';
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


//////////////////////////////////////////
///////   GENERAL APP SETTINGS   ////////
////////////////////////////////////////
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


///////////////////////////////////////////////s
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
var myModule = require('./app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo
app.locals.sitename = sitename
app.locals.website = website
app.locals.repo = repo


///////////////////////////////////////////////
////       FRATERNATE NPM MODULE          //// 
/////////////////////////////////////////////
var fraternate = require("fraternate");
app.use('/', fraternate);



/////////////////////////////
////       500          //// 
/////////////////////////// 
app.use(function(err, req, res, next) {
  // log the error, treat it like a 500 internal server error
  // maybe also log the request so you have more debug information
  //log.error(err, req);

  // during development you may want to print the errors to your console
  //console.log(err.stack);
req.flash('error', { msg: JSON.stringify(err)});
  // send back a 500 with a generic message
  res.status(500);
  res.redirect('/500');
});

/////////////////////////////
////       500          //// 
///////////////////////////
app.get('/500', function(req, res){
  res.render('../../../views/500',{
    layout:false
  });
});

/////////////////////////////
////       404          //// 
///////////////////////////
app.get('*', function(req, res){
  res.render('../../../views/404',{layout:false});
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
