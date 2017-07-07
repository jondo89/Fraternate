var organizationalModel      = require('../models/organizations.js');
var User = require('../models/User');
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

////////////////////////////////////////////
/////  GO TO PAGE NEW ORGANIZATION    ///// 
//////////////////////////////////////////
exports.neworg = function(req, res) {
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
    	res.render('neworg',{
        title: 'New Organization | '+sitename ,
      })
    } else {
      res.redirect('/signin');
    }
  }; 

///////////////////////////////////////////////
///////   CREATE ORGaNIZATION STATIC  ////////
/////////////////////////////////////////////
exports.createorgstatic = function(req, res) {
//console.log('//////////////////////////////////////////')
//console.log('//////  CREATE NEW ORGaNIZATION  ////////')
// console.log('////////////////////////////////////////')
//Allow for new credit cards every time , Do not call old CC details.	
if (req.user) {
  req.assert('name', 'Username cannot be blank').notEmpty();
  req.assert('email', 'Please ensure that the email address is valid.').isEmail();
  req.assert('email', 'Please ensure that the email address is included.').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });
  var errors = req.validationErrors();
  if (errors) {
   req.flash('error', errors);
   return res.redirect('/organizations/new');
 }
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.body.name }, function(err, username) {
    	if (username) {
    		req.flash('error', { msg: 'The Organizational name you have entered is already associated with another account.' });
    		return res.redirect('/organizations/new');
    	}
      var temp = {}
      temp['entry'] ={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        owner : req.user.username,
        members : ''
      }        
      user = new organizationalModel(temp);
      user.save(function(err) {
        res.redirect('/organizations/'+req.body.name);
      });
    });
  } else {
   res.redirect('/signin');
 }
}

////////////////////////////////////////////
////////// PROFILE ORGANIATION ////////////
//////////////////////////////////////////
exports.orgprofile = function(req, res) {
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        res.render('account/orgprofile',{
          orgowner : req.orgowner ,
          orgmember : req.orgmember ,
          orgsharerequest : req.orgsharerequest,
          organization : username,
          organizations : req.userorgs ,
          title: username.entry.name + ' | '+sitename ,
        }
        )
      } else {
        return res.redirect('/');
      }
    })
  }

////////////////////////////////////////////
////////// PROFILE ORGANIATION ////////////
//////////////////////////////////////////
exports.orguserread = function(req, res) {
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        res.render('account/orgprofile',{
          organization : username,
          organizations : req.userorgs ,
          title: username.entry.name + ' | '+sitename ,
        }
        )
      } else {
        return res.redirect('/');
      }
    })
  }

////////////////////////////////////////////
////////// PROFILE ORGANIATION ////////////
//////////////////////////////////////////
exports.ajaxorguserread = function(req, res, next) {
  if (req.user) {
    //console.log(req.user)
    var username =  req.user.username
    var query1 = organizationalModel.find(
      {$or: [
        {"entry.members": username },
        {"entry.owner":  username }
        ]}
        )
    query1.exec(function (err, query1_return) {
      if(err){console.log('Error Here'); return;} 
      req.userorgs = query1_return
      next();
    })
  } else {
   next();
 }
}

//////////////////////////////
//////////  PAGE ////////////
////////////////////////////
exports.page = function(req, res) {
  if (req.orgowner) {
   var template =  req.params.page 
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        res.render('orgsettings/'+template,{
          orgowner : req.orgowner ,
          orgmember : req.orgmember ,
          organization : username,
          organizations : req.userorgs ,
          pagetitle: 'Settings | '+username.entry.name   ,
        }
        )
      } else {
        return res.redirect('/');
      }
    })
  } else {
    return res.redirect('/');
  }
};

/////////////////////////////////////
////////// SETTINGS PAGE ///////////
///////////////////////////////////
exports.settings = function(req, res) {
  if (req.orgowner) {
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        res.render('orgsettings/settings',{
          orgowner : req.orgowner ,
          orgmember : req.orgmember ,
          organization : username,
          organizations : req.userorgs ,
          title: 'Settings | '+username.entry.name   ,
        }
        )
      } else {
        return res.redirect('/');
      }
    })
  } else {
    return res.redirect('/');
  }
};

//////////////////////////////////////
////////// COMPONENTS PAGE ///////////
/////////////////////////////////////
exports.components = function(req, res) {
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        var ids = '58d371b01373c63dccdee169'
        var Formids = '58aa74140b9d3241280ecf17'
        res.render('orgsettings/components', {
          siteName : siteName,
          items : JSON.stringify(ids),
          Formids : JSON.stringify(Formids),
          organization : username,
          organizations : req.userorgs ,
          title: 'Components | '+username.entry.name   ,
        });
      } else {
        return res.redirect('/');
      }
    })
  };

////////////////////////////////////
////////// ASSEMBLIES PAGE ////////
//////////////////////////////////
exports.assemblies = function(req, res) {
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        res.render('orgsettings/assemblies',{
          organization : username,
          organizations : req.userorgs ,
          title: 'Assemblies | '+username.entry.name   ,
        }
        )
      } else {
        return res.redirect('/');
      }
    })
  };

///////////////////////////////////
////////// PEOPLE PAGE ///////////
/////////////////////////////////
exports.people = function(req, res) {
    //check the user name for duplicate.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, username) {
      if (username) {
        res.render('orgsettings/people',{
          owner:req.owner,
          ownerParse:req.ownerParse,
          members:req.members ,
          membersParse:req.membersParse,
          requests:req.requests ,
          requestsParse:req.requestsParse,
          orgowner : req.orgowner ,
          orgmember : req.orgmember ,
          organization : username,
          organizations : req.userorgs ,
          title: 'People | '+username.entry.name ,
        }
        )
      } else {
        return res.redirect('/');
      }
    })
  };

///////////////////////////////////
////////// ORGPUT PAGE ///////////
/////////////////////////////////
exports.orgPut = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  var errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors);
    res.redirect('/organizations/'+req.params.orgname+'/settings/profile');
  }
  organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, organizationItem) {
    organizationalModel.findById(organizationItem._id, function (err, orgid) {
      if (err) return handleError(err);
      if (orgid) { 
        //Profile Picture saving.
        var image = req.body.croppedImg
        var fs = require('fs');
        var directory = 'public/uploads/'
        var fileName = directory+orgid._id+'.jpg'
        var data = image.replace(/^data:image\/\w+;base64,/, '');
        fs.writeFile(fileName, data, {encoding: 'base64'}, function(err){
          //Finished
        });
        //Painful parse issue.
        var temp = JSON.parse(JSON.stringify(orgid.entry))
        temp.picture = '/uploads/'+orgid._id+'.jpg'
        //Assign
        if (req.body.name !=null) {
         temp.name = req.body.name
       }
       temp.displayname = req.body.displayname
       temp.description = req.body.description
       temp.location = req.body.location
       temp.url = req.body.url
       temp.email = req.body.email
       temp.displayemail = req.body.displayemail
       orgid.entry = temp    
       orgid.save(function(err,doc) {
        req.flash('success', { msg: 'Your profile information has been updated.' });
        res.redirect('/organizations/'+req.params.orgname+'/settings/profile');
      });
     } else {
      req.flash('error', { msg: 'Something went wrong here.' });
      res.redirect('/organizations/'+req.params.orgname+'/settings/profile');
    }
  });
  })
};

///////////////////////////////////////////
//////////  ORGaNIZATION LIST ////////////
/////////////////////////////////////////
exports.orglist = function(req, res) {
  organizationalModel.find(  function(err, username) {
    res.render('orginizationlist',{
      username : username,
      pagetitle: 'Organizations | '+sitename+'',
    });
  });
};

////////////////////////////////////////////
//////////  ORGaNIZATION LEAVE ////////////
//////////////////////////////////////////
exports.leaveorganiztion = function(req, res) {
  if (req.user) {
    organizationalModel.findOne( {"entry.name" : req.params.ids}, function(err, organization) {
      var temp = JSON.parse(JSON.stringify(organization.entry))
      if (temp.owner == req.user.username) {
        temp.owner = ''
      }
      var tempArry =[]  
      for (var i = 0; i < temp.members.length; i++) {
        if (temp.members[i] == req.user.username) {
        } else {
          tempArry.push(temp.members[i])
        }
      }
      temp.members = tempArry
      organization.entry = temp    
      organization.save(function(err) {
        req.flash('success', { msg: 'You are no longer a member of the organization '+organization.entry.name+'.' });
        res.redirect('/users/'+req.user.username+'/settings/organizations');
      });
    });
  } else {
    return res.redirect('/');
  }
};



///////////////////////////////////////////////
//////////  ORGANIZATION ADD USER  ///////////
/////////////////////////////////////////////
exports.orgshareadd = function(req, res) {

};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Middelware -  Limit to 1 query.


////////////////////////////////////
////////// PROFILE PAGE ////////////
///////////////////////////////////
exports.userorganizations = function(req, res, next) {
  //Work around for the home controller with out paramater request
  if (req.user) { 
    if (!req.params.username) { 
      req.params.username = req.user.username
    }
  }
  var query1 = organizationalModel.find(
    {$or: [
      {"entry.members": req.params.username },
      {"entry.owner":  req.params.username }
      ]}
      )
  query1.exec(function (err, query1_return) {
    if(err){console.log('Error Here'); return;} 
    //console.log(query1_return,'query1_return userorganizations')
    req.organizations = query1_return
    req.organizationsParse = JSON.stringify(query1_return)
    next();
       //Query end
     })
};


////////////////////////////////////////////////
////////// ORGANIZATION PERMISSION ////////////
//////////////////////////////////////////////
exports.organizationpermission = function(req, res, next) {
  //Work around for the home controller with out paramater request
  if (req.user) { 
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, organization) {
      //Check if this user is an owner of this organization
      if (organization.entry.owner) {
        if (organization.entry.owner == req.user.username) {
          req.orgowner = true 
        }
      }
      //Check if this user is a memeber
      if (organization.entry.members) {
        for (var i = 0; i < organization.entry.members.length; i++) {
          if (organization.entry.members[i] == req.user.username) {
            req.orgmember = true 
          }
        }
      }
      //Check if this user has requested membership to this organization
      if (organization.entry.requests) {
        for (var i = 0; i < organization.entry.requests.length; i++) {
          if (organization.entry.requests[i] == req.user.username) {
            req.orgsharerequest = true 
          }
        }
      }
      next();
    })
  } else {
    next();
  }
};  

///////////////////////////////////////////////////
//////////  ORGANIZATION SHARE REQUEST ///////////
/////////////////////////////////////////////////
exports.orgsharerequest = function(req, res, next) {
  if (req.user) {
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, organization) {
      var temp = JSON.parse(JSON.stringify(organization.entry))
      if (temp['requests']) {
        temp['requests'].push(req.user.username)
      } else {
        temp.requests = []
        temp.requests.push(req.user.username)
      }
      organization.entry = temp
      organization.save(function(err,doc) {
        req.flash('success', { msg: 'You requests has been sent to the organization owner.' });
        next();
      });
    });
  } else {
   res.redirect('/signin');
 }
};

////////////////////////////////////////////////////////////////////
//////////  ORGANIZATIONAL OWNER GET FULL USER DETAILS  ///////////
//////////////////////////////////////////////////////////////////
exports.orgowneruserdetail = function(req, res, next) {
  if (req.user) {
  organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, organization) {
        //Is this the org owner.
        if (organization.entry.owner == req.user.username) {
          console.log('THis is entrering Here')
          // if yes then send details of 
          //Owner
          //Member
          //Requests.
          User.findOne({ 'username': organization.entry.owner }).exec(function(err, user) {
            User.find({ 'username': organization.entry.members }).exec(function(err, user1) {
              User.find({ 'username': organization.entry.requests }).exec(function(err, user2) {
                req.owner = user
                req.ownerParse = JSON.stringify(user)
                req.members = user1
                req.membersParse = JSON.stringify(user1)
                req.requests = user2
                req.requestsParse = JSON.stringify(user2)
                next();
              })
            })
          })
        } else {
          next();
        }
      });
} else {
          next();
        }
};