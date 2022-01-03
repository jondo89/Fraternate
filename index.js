var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var recaptcha = require('express-recaptcha');
var helpers = require('handlebars-helpers')(['string','moment']);
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
var moment = require("moment");


var util = require('handlebars-utils');

MomentHandler.registerHelpers(Handlebars);
dotenv.config({silent: true})
//Primary app variable.
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
//You can also configure useCreateIndex by passing it through the connection options.
mongoose.set('useCreateIndex', true);
//To opt in to using the new topology engine, use the below line:
mongoose.set('useUnifiedTopology', true);
////////////////////////////////////////////////////
///////   HEROKU VS LOCALHOST .ENV SWAP    ////////
//////////////////////////////////////////////////
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
} else {
  mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
}
//Mongo error trap.
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
//Define the mongo enviroment
var db = mongoose.connection;
db.once('open', function() {
  // we're connected!
  console.log('\x1b[36m%s\x1b[0m',process.env.MONGODBNAME ,' : mongoose connection ok')
  //compile the schema for mongoose
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
/////////////////////////////////////////////
///////   LOCALHOST PORT SETTING    ////////
///////////////////////////////////////////
app.set('port', process.env.PORT || parseFloat(process.env.LOCALHOSTPORT));
app.use(compression());
app.use(logger('dev'));
//This pumps up the payload to accomidate larger data sets
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//extend
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(methodOverride('_method'));
if(process.env.SESSION_SECRET){
  app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));  
} else{
  console.log('Your .env file is incorrectly configured.')
}
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());








app.use(function(req, res, next) {
  res.locals.website = myModule.website
  res.locals.logo = myModule.logo


  if(process.env.DARKMODE =='true'){
       res.locals.themedark = true
  }  



  if(req.user){
    res.locals.user = JSON.parse(JSON.stringify(req.user));
    res.locals.themedark = req.user.darkmode;
  }
    res.locals.VERIFICATION_GOOGLE = process.env.VERIFICATION_GOOGLE;//expose the google analytics tracking code for use.
    res.locals.TRACKINGCODEGA = process.env.TRACKINGCODEGA;//expose the google analytics tracking code for use.
    next();
  });
app.use(express.static(path.join(__dirname, 'public')));
///////////////////////////////////////////////s
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
var myModule = require('./app.json');
//META SEO ITEMS
app.locals.sitename = myModule.sitename
app.locals.website = myModule.website
app.locals.sitedescription = myModule.description
app.locals.repo = myModule.repo
app.locals.author = myModule.author
app.locals.keywords = myModule.keywords
app.locals.tagline = myModule.tagline
//Define the partials directory
var partialsDir = ['views/partials']
//Set up css and javasciprt locals.
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/popper.js/dist'));
app.use(function(req, res, next) {
  res.locals.siteversion = myModule.version
  res.locals.sitedescription = myModule.description;
  next();
});
//Message Flashing for saving etc.
var flash = require('connect-flash');
app.use(flash());
///////////////////////////////
////       ROUTING        //// 
/////////////////////////////
//////////////////////////////////////////////////////////////
////       GET THE HEAVYLIFTING DATABASE STRUCTURE        //// 
//////////////////////////////////////////////////////////////
const fs = require('fs');//use the file system plugin 
var rawdata = fs.readFileSync('./heavylifting.json'); // get the heavylifting json and parse into an object for use.
var collections = JSON.parse(rawdata); 
collections = collections.collections
/////////////////////////////////////////////////////////
////       USED FOR THE COLLECTION INJECTION        //// 
///////////////////////////////////////////////////////
app.use(function (req, res, next) {
  res.locals.collections = collections
  next();
})

///////////////////////////////////////////////
////       FRATERNATE NPM MODULE          //// 
/////////////////////////////////////////////
var fraternate = require("fraternate");
//Append the partial directory inside the NPM module.
partialsDir.push('./node_modules/fraternate/views/partials')
app.use('/', fraternate);
/////////////////////////////////////////////////
////       HEAVYLIFTING NPM MODULE          //// 
///////////////////////////////////////////////
var heavylifting = require("heavylifting");
//Append the partial directory inside the NPM module.
partialsDir.push('./node_modules/heavylifting/views/partials')
app.use('/', heavylifting);
///////////////////////////////////////////////////
////       CLEANER-WRASSE NPM MODULE          //// 
/////////////////////////////////////////////////
var cleaner_wrasse = require("cleaner-wrasse");
//Append the partial directory inside the NPM module.
partialsDir.push('./node_modules/cleaner-wrasse/views/partials')
app.use('/', cleaner_wrasse);



//////////////////////////////////////////
////       SEMINI NPM MODULE          //// 
//////////////////////////////////////////
var semini = require("semini");
//Append the partial directory inside the NPM module.
partialsDir.push('./node_modules/semini/views/partials')
app.use('/', semini);



/////////////////////////////////
////       HOME             //// 
///////////////////////////////
var organizationController = require("./node_modules/fraternate/controllers/organization");//In order to pass the user orginizational structure this needs to be here.
var userController = require('./node_modules/fraternate/controllers/user');
var HomeController = require('./controllers/home');
app.get('/',
  organizationController.userorganizations,
  HomeController.index
  );
app.get('/contact',
  HomeController.contact
  ); 


//////////////////////////////////////////
////        CREATE UNIQUE ID         //// 
////////////////////////////////////////
function create_uid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4();
}

/////////////////////////////////////////
///////   HANDLEBARS HELPERS    ////////
///////////////////////////////////////
var hbs = exphbs.create({
  defaultLayout: __dirname+'/views/layouts/main',
  partialsDir:partialsDir,
  helpers: {
    adminfileedit: function (name) {
      var html = ''  
      if (process.env.DEBUG == 'true') {
        html+='<a class="btn btn-outline-warning bt-sm adminedit" style="" data-filename='
        html+= name.data.exphbs.filePath  
        html+=' id="'+create_uid()+'" onclick="editFile(this.id)" href="#" class="text-warning">edit</a> '
      }
      return html;
    },
 
    dateFormat: function(val) {
      return moment(val).format("MMMM Do YYYY, h:mm:ss a Z z")
    },
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    getNullsasblank :function(val) {
      if(val === undefined ||val =='undefined') {
        return "null";
      }
      return val;
    },
    debug: function(optionalValue) {
      console.log("Current Context");
      console.log("====================");
      console.log(this);
      if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
      }
    },
    toJSON : function(object) {
      return JSON.stringify(object, null, 2);
    },
    json: function(context) {
      var temp = JSON.stringify(context)
      try {
        temp1 = JSON.parse(temp)
        var temp2 = JSON.stringify(temp1)
      } catch (err){
        console.trace(context,temp,err)
        var temp = context
      }
      return temp2;
    },
    partial: function (name) {
      return name;
    },
    uniqueid: function (uniqueid) {
      return create_uid();
    },
    capitalizeFirst: function (str) {
      return str[0].toUpperCase() + str.slice(1, str.length);
    },
    'dots' : function(arg1,str) {
      if (str) {
        if (str.length > arg1)
          return str.substring(0,arg1) + '...';
        return str;}
      },
      'profile' : function(str) {
        if (str) {
          if (str.length > 550)
            return str.substring(0,550) + '...';
          return str;
        }
      },
    }
  });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
/////////////////////////////
////       500          //// 
/////////////////////////// 
app.use(function(err, req, res, next) {
  // log the error, treat it like a 500 internal server error
  // maybe also log the request so you have more debug information
  //log.error(err, req);
  // during development you may want to print the errors to your console
  console.log(err.stack,"trigger 500 errors");
  req.flash('error', { msg: JSON.stringify(err)});
  // send back a 500 with a generic message
  res.status(500);
  res.redirect('/500');
});
/////////////////////////////
////       500          //// 
///////////////////////////
app.get('/500', function(req, res){
  console.log('Calling the 500 error')
  res.render('500',{
    siteName : myModule.sitename,
    pagetitle : 'Error 500' + ' | '+myModule.sitename,
    layout:false
  });
}); 
/////////////////////////////
////       404          //// 
///////////////////////////
app.get('*', function(req, res){
  res.status(404).render('404',{
    siteName : myModule.sitename,
    pagetitle : 'Error 404' + ' | '+myModule.sitename,
    layout:false
  });
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
