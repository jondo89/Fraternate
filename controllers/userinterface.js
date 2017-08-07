 
var User = require('../models/User');
var braintree = require("braintree");
////////////////////////////////////////////
///////   BRAINTREE INTEGRATION    ////////
//////////////////////////////////////////
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY
});

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

//////////////////////////////////
/////  PRIVACY STATEMENT    ///// 
////////////////////////////////
exports.privacy = function(req, res) {
  res.render('privacy-statement',{
    pagetitle: 'Privacy | '+sitename+'',
  })
}; 

//////////////////////////////////
/////  TERMS STATEMENT    ///// 
////////////////////////////////
exports.terms = function(req, res) {
  res.render('terms-of-service',{
    pagetitle: 'Terms of Service | '+sitename+'',
  })
}; 

//////////////////////
/////  INTRO    ///// 
////////////////////
exports.introduction = function(req, res) {
  res.render('introduction',{
    pagetitle: 'An Intro | '+sitename+'',
  })
}; 

////////////////////////////////
/////  TROUBLESHOOTING    ///// 
//////////////////////////////
exports.troubleshooting = function(req, res) {
  res.render('troubleshooting',{
    pagetitle: 'Troubleshooting | '+sitename+'',
  })
}; 

/////////////////////////////
/////  INSTALLATION    ///// 
///////////////////////////
exports.installation = function(req, res) {
  res.render('installation',{
    pagetitle: 'Installation | '+sitename+'',
  })
};

//////////////////////////
/////  PAYMENTS     ///// 
////////////////////////
exports.payments = function(req, res) {
  res.render('payments',{
    pagetitle: 'Payments | '+sitename+'',
  })
};

/////////////////////////////
/////  INTEGRATION     ///// 
///////////////////////////
exports.integration = function(req, res) {
  res.render('integration',{
    pagetitle: 'Integration | '+sitename+'',
  })
};

/////////////////////////////
/////  LICENCE         ///// 
///////////////////////////
exports.licence = function(req, res) {
  res.render('licence',{
    pagetitle: 'Licence | '+sitename+'',
  })
};

/////////////////////////////////
/////  SPECIFICATIONS      ///// 
///////////////////////////////
exports.specifications = function(req, res) {
  res.render('specifications',{
    pagetitle: 'Specifications | '+sitename+'',
  })
};

//////////////////////////
/////  UPGRADE      ///// 
////////////////////////
exports.upgrade = function(req, res) {
    //Perform Routing for Varios user type on the home page.
    if (req.user) {


 

      //Create client token for Braintree payments.
      if (req.user.braintreeid) {
        gateway.customer.find(req.user.braintreeid, function(err, customer) {
          if (customer) {
           gateway.clientToken.generate({
            customerId: customer.id
          }, function (err, response) {
            res.render('settings/upgrade',{
              pagetitle: 'Upgrade | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });

         }else{
           gateway.clientToken.generate({}, function (err, response) {
            res.render('settings/upgrade',{
              pagetitle: 'Upgrade | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }

         
       });
      } else {
        gateway.clientToken.generate({}, function (err, response) {
          res.render('settings/upgrade',{
            pagetitle: 'Upgrade | '+sitename+'',
            clientToken : response.clientToken
          })
        });
      }


    } else {
      res.redirect('/signin');
    }
  };

///////////////////////////
/////  PAYMENTS      ///// 
/////////////////////////
exports.payment = function(req, res) {
    //Perform Routing for Various user type on the home page.
    if (req.user) {
      //Create client token for Braintree payments.
      if (req.user.braintreeid) {
        gateway.customer.find(req.user.braintreeid, function(err, customer) {
          if (customer) {
           gateway.clientToken.generate({
            customerId: customer.id
          }, function (err, response) {
            res.render('settings/payment',{
              pagetitle: 'Payment | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });

         }else{
           gateway.clientToken.generate({}, function (err, response) {
            res.render('settings/payment',{
              pagetitle: 'Payment | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }

         
       });
      } else {
        gateway.clientToken.generate({}, function (err, response) {
          res.render('settings/payment',{
            pagetitle: 'Payment | '+sitename+'',
            clientToken : response.clientToken
          })
        });
      }
    } else {
      res.redirect('/signin');
    }
  };

////////////////////////
/////  VAULT      ///// 
//////////////////////
exports.vault = function(req, res) {
  console.log('VAlutr')
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      var errors = req.validationErrors();
      if (errors) {
        req.flash('error', errors);
        return res.redirect(  '/users/'+req.user.username+'/settings/billing/payment'  );
      }
      User.findById(req.user.id, function(err, user) {
        user.email = req.body.email;
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.fax = req.body.fax;
        if (user.location ==-1) {
          user.location = ''
        } else {
          user.location = req.body.location;
        }
        user.website = req.body.website;
        user.save(function(err) {
          if (err && err.code === 11000) {
            req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
          }  
          console.log
          gateway.customer.create({
            firstName: user.name,
            email: user.email,
            phone: user.phone,
            fax: user.fax ,
            website: user.website,
            creditCard: {
              paymentMethodNonce: req.body.payload,
    //options: { updateExistingToken: "theToken" }
  }
}, function (err, result) {
  if(err){
    console.log('Error Here query1',err); return;
    req.flash('error',{ msg: '<div class="alert alert-warning" role="alert"> <strong>Warning!</strong> payment method error has occured <pre>'+err+'</pre> Please send us this warning.</div>' });
    return res.send()
  }
  var errors = result.errors;
  if (errors) {
    var customerErrors = errors.for("customer").deepErrors();
    for (var i in customerErrors) {
      if (customerErrors.hasOwnProperty(i)) {
        console.log(customerErrors[i].code);
        console.log(customerErrors[i].message);
        console.log(customerErrors[i].attribute);
      }
    }
    req.flash('error',{ msg: 'Heads up, There is a validation error with your details.' });
    return res.send()
  } else {
   if (errors) {
    var creditCardErrors = errors.for("customer").for("creditCard").deepErrors();
    for (var i in creditCardErrors) {
      if (creditCardErrors.hasOwnProperty(i)) {
        console.log(creditCardErrors[i].code);
        console.log(creditCardErrors[i].message);
        console.log(creditCardErrors[i].attribute);
      }
    }
    req.flash('error',{ msg: 'Heads up, There is a error with your credit card validation.' });
    return res.send()
  } else {
    User.findById(req.user.id, function(err, user) {
      user.braintreeid = result.customer.id
      user.save(function(err) {
        console.log(result)
        req.flash('success',{ msg: 'Your payment details have been updated.' });
        return res.send()
      });
    });
  }
}
});
        });
      });
    } else {
      res.redirect('/signin');
    }
  };

//////////////////////////////
/////  VAULT UPDATE     ///// 
////////////////////////////
exports.vaultupdate = function(req, res) {
  console.log('VAlutsssssssssssssssr')
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      var errors = req.validationErrors();
      if (errors) {
        req.flash('error', errors);
        return res.redirect(  '/users/'+req.user.username+'/settings/billing/payment'  );
      }
      User.findById(req.user.id, function(err, user) {
        user.email = req.body.email;
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.fax = req.body.fax;
        if (user.location =='-1') {
          user.location = ''
        } else {
          user.location = req.body.location;
        }
        user.website = req.body.website;
        user.save(function(err) {
          if (err && err.code === 11000) {
            req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
          }  
          gateway.customer.update(user.braintreeid,{
            firstName: user.name,
            email: user.email,
            phone: user.phone,
            fax: user.fax ,
            website: user.website,
            creditCard: {
              paymentMethodNonce: req.body.payload,
              //options: { updateExistingToken: "theToken" }
            }
          }, function (err, result) {
            if(err){
              console.log('Error Here query1',err); return;
              req.flash('error',{ msg: '<div class="alert alert-warning" role="alert"> <strong>Warning!</strong> payment method error has occured <pre>'+err+'</pre> Please send us this warning.</div>' });
              return res.send()
            }
            var errors = result.errors;
            if (errors.customer) {
              var customerErrors = errors.for("customer").deepErrors();
              for (var i in customerErrors) {
                if (customerErrors.hasOwnProperty(i)) {
                  console.log(customerErrors[i].code);
                  console.log(customerErrors[i].message);
                  console.log(customerErrors[i].attribute);
                }
              }
              req.flash('error',{ msg: 'Heads up, There is a validation error with your details.' });
              return res.send()
            } else {
             if (errors.customer) {
              var creditCardErrors = errors.for("customer").for("creditCard").deepErrors();
              for (var i in creditCardErrors) {
                if (creditCardErrors.hasOwnProperty(i)) {
                  console.log(creditCardErrors[i].code);
                  console.log(creditCardErrors[i].message);
                  console.log(creditCardErrors[i].attribute);
                }
              }
              req.flash('error',{ msg: 'Heads up, There is a error with your credit card validation.' });
              return res.send()
            } else {
              User.findById(req.user.id, function(err, user) {

                user.save(function(err) {
                  console.log(result)
                  req.flash('success',{ msg: 'Your payment details have been updated.' });
                  return res.send()
                });
              });
            }
          }
        });
        });
      });
    } else {
      res.redirect('/signin');
    }
  };

////////////////////////////////////////////////////
/////  DELETE PAYMENT DETAILS FROM VAULT      ///// 
////////////////////////////////////////////////////
exports.deletepaymentdetails = function(req, res) {
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      User.findById(req.params.ids, function(err, user) {
        console.log(user.braintreeid)
        gateway.customer.delete(user.braintreeid, function(err) {
          if(err){
           req.flash('error', { msg: 'Something went wrong here with braintreeid '+err+' .' });
           res.redirect('/users/'+user.username+'/settings/billing/payment');
           return;
         }

         delete user.braintreeid
         user.save(function(err) {
          if(err){
           req.flash('error', { msg: 'Something went wrong here '+err+' .' });
           res.redirect('/users/'+user.username+'/settings/billing/payment');
           return;
         }
         req.flash('success', { msg: 'Payment details for '+user.username+' have be deleted from Braintree Vault.' });
         res.redirect('/users/'+user.username+'/settings/billing/payment');
         return;
       });
       });
      });

    } else {
      res.redirect('/signin');
    }
  };




////////////////////////////////////
////////// SETTINGS PAGE ///////////
///////////////////////////////////
exports.settings = function(req, res) {
	if (req.user) {
		userid = req.user.id
		res.render('settings'
     );
	} else {
		res.redirect('/signin');
	}
};

////////////////////////////////////
////////// PROFILE PAGE ////////////
///////////////////////////////////
exports.profile = function(req, res) {
 //There is a requirement to limit the form size  , as such send the find and send the headings from the parent.
 var query1 = User.findOne(
 {
  "username" : req.params.username
})
 query1.exec(function (err, user) { 
  if(err){console.log('Error Here query1'); return;}
  if (user) {
    user.password = 'Kwakwakwa'
    res.render('account/profile', {
      userload : user,
        items:req.items, //list of all '+sitename+' DB entires
        itemsParse:req.itemsParse,//list of all '+sitename+' DB entires
        organizations : req.organizations,
        organizationsParse:req.organizationsParse,
        pagetitle: user.username+' | '+sitename+'',
      });

  } else {
   res.redirect('/');
 }
 //Query end
})
};

//////////////////////////////
//////////  PAGE ////////////
////////////////////////////
exports.page = function(req, res) {
  if (req.user) {
    var template =  req.params.page 
    var username =  req.params.username 
    switch (true){
      case(template=='organizations'):
      res.render('settings/'+template,{
        organizations : req.organizations,
        organizationsParse:req.organizationsParse,
        pagetitle: template+' | '+sitename+'',
      })
      break;
      case(template=='billing'):
      if (req.user.braintreeid) {
        gateway.customer.find(req.user.braintreeid, function(err, customer) {
          res.render('settings/'+template,{
            pagetitle: 'Billing | '+sitename+'',
            braintree_customer : JSON.stringify(customer)
          })
        });
      } else {
        res.render('settings/'+template,{
          pagetitle: 'Billing | '+sitename+'',
        })
      }
      break;      default:
      res.render('settings/'+template);
      break;
    }
  } else {
   res.redirect('/signin');
 }
};

////////////////////////////////////
//////////  USERS LIST ////////////
//////////////////////////////////
exports.users = function(req, res) {
  User.find(  function(err, username) {
    res.render('userlist',{
      username : username,
      pagetitle: 'Users | '+sitename+'',
    });
  });
};


