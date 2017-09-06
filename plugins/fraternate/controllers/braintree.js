var User = require('../../../models/User');
var braintree = require("braintree");
//set the plugin controller directory
var directory = '../../../plugins/fraternate/'
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
var myModule = require('../../../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

////////////////////////////////////////////////////
//////////  BRAINTREE TRANSACTION LIST ////////////
//////////////////////////////////////////////////
exports.transactions = function(req, res) {
  res.render('../../../plugins/fraternate/views/transactions', {
    pagetitle: 'Transactions | '+sitename+'',
  });
};

//////////////////////////////////////////////////
/////  STREAM IN TRANSACTION HISTROY ALL    ///// 
////////////////////////////////////////////////
exports.transaction_history_all = function(req, res) {
  var stream = require("stream");
  var customerStream = gateway.transaction.search(function (search) {
        //  search.customerId().is(req.user.braintreeid)
      });
  res.write("[");
  var first = true;       
  customerStream.on("data", function (customer) {
    if (first) {
      first = false;
      var temp =  JSON.stringify(customer);
    } else {
      var temp =  "," + JSON.stringify(customer);
    }
    res.write(temp);
  });
  customerStream.on("end", function () {
    res.write("]");
    res.end();
  });
};

///////////////////////////////////////////////////
/////  STREAM IN SUBSCRIPTION HISTROY ALL    ///// 
/////////////////////////////////////////////////
exports.subscription_history_all = function(req, res) {
  var stream = require("stream");
  var customer_stream = gateway.customer.search(function (search) {
        // search.id().is(req.user.braintreeid)
      });
  res.write("[");
  var first = true;       
  customer_stream.on("data", function (customer) {
    if (first) {
      first = false;
      var temp =  JSON.stringify(customer);
    } else {
      var temp =  "," + JSON.stringify(customer);
    }
    res.write(temp);
  });
  customer_stream.on("end", function () {
    res.write("]");
    res.end();
  });
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
            res.render('../../../plugins/fraternate/views/settings/payment',{
              pagetitle: 'Payment | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }else{
           gateway.clientToken.generate({}, function (err, response) {
            res.render('../../../plugins/fraternate/views/settings/payment',{
              pagetitle: 'Payment | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }
       });
      } else {
        gateway.clientToken.generate({}, function (err, response) {
          res.render('../../../plugins/fraternate/views/settings/payment',{
            pagetitle: 'Payment | '+sitename+'',
            clientToken : response.clientToken
          })
        });
      }
    } else {
      res.redirect('/signin');
    }
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
            res.render('../../../plugins/fraternate/views/settings/upgrade',{
              pagetitle: 'Upgrade | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }else{
           gateway.clientToken.generate({}, function (err, response) {
            res.render('../../../plugins/fraternate/views/settings/upgrade',{
              pagetitle: 'Upgrade | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }
       });
      } else {
        gateway.clientToken.generate({}, function (err, response) {
          res.render('../../../plugins/fraternate/views/settings/payment',{
            pagetitle: 'Payment | '+sitename+'',
            clientToken : response.clientToken
          })
        });
      }
    } else {
      res.redirect('/signin');
    }
  };

////////////////////////////////
/////  UPGRADE PLAN 2     ///// 
//////////////////////////////
exports.upgrade_plan_2 = function(req, res) {
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      //Create client token for Braintree payments.
      if (req.user.braintreeid) {
        gateway.customer.find(req.user.braintreeid, function(err, customer) {
          if (customer) {
           gateway.clientToken.generate({
            customerId: customer.id
          }, function (err, response) {
            res.render('../../../plugins/fraternate/views/settings/upgrade_plan_2',{
              pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }else{
           gateway.clientToken.generate({}, function (err, response) {
            res.render('../../../plugins/fraternate/views/settings/upgrade_plan_2',{
              pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }
       });
      } else {
        gateway.clientToken.generate({}, function (err, response) {
          res.render('../../../plugins/fraternate/views/settings/payment',{
            pagetitle: 'Payment | '+sitename+'',
            clientToken : response.clientToken
          })
        });
      }
    } else {
      res.redirect('/signin');
    }
  };

///////////////////////////////////////
/////  SUBSCRIPTION - PLAN 1     ///// 
/////////////////////////////////////
exports.subscription = function(req, res) {
  var plan = "ncfr"
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      //Create client token for Braintree payments.
      if (req.user.braintreeid) {
      	gateway.customer.find(req.user.braintreeid, function(err, customer) {
      		if (customer) {
      			gateway.clientToken.generate({
      				customerId: customer.id
      			}, function (err, response) {
      				gateway.subscription.create({
      					paymentMethodToken: customer.paymentMethods[0].token,
      					planId: plan,
      				}, function (err, result) {
                    //Poorly configured error traps  , needs vast improvement.
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
                        user.plan.name = plan
                        user.plan.braintreeid = result.subscription.id
                        user.save(function(err) {
                          console.log(result)
                          req.flash('success',{ msg: 'Your payment has been successfully processed.' });
                          return res.send()
                        });
                      });
                    }
                  }
                }); 
      			});
      		}else{
      			console.log('Did fghfghfghfgh happen here')
      		}
      	});
      } else {
      	console.log('Did anyssssssssssssssssssthing happen here')
      }
    } else {
     res.redirect('/signin');
   }
 };

///////////////////////////////////////
/////  SUBSCRIPTION - PLAN 2     ///// 
/////////////////////////////////////
exports.subscription_plan_2 = function(req, res) {
  var plan = "fd8m"
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      //Create client token for Braintree payments.
      if (req.user.braintreeid) {
        gateway.customer.find(req.user.braintreeid, function(err, customer) {
          if (customer) {
            gateway.clientToken.generate({
              customerId: customer.id
            }, function (err, response) {
              gateway.subscription.create({
                paymentMethodToken: customer.paymentMethods[0].token,
                planId: plan,
              }, function (err, result) {
                    //Poorly configured error traps  , needs vast improvement.
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
                        user.plan.name = plan
                        user.plan.braintreeid = result.subscription.id
                        user.save(function(err) {
                          console.log(result)
                          req.flash('success',{ msg: 'Your payment has been successfully processed.' });
                          return res.send()
                        });
                      });
                    }
                  }
                }); 
            });
          }else{
            console.log('Did fghfghfghfgh happen here')
          }
        });
      } else {
        console.log('Did anyssssssssssssssssssthing happen here')
      }
    } else {
     res.redirect('/signin');
   }
 };

///////////////////////////////////////////
/////  CANCEL USER SUBSCRIPTIONS     ///// 
/////////////////////////////////////////
exports.cancel_subscription = function(req, res) {
  User.findById(req.user._id, function(err, user) {  
    var temp = JSON.parse(JSON.stringify(user.plan))
    user.plan = {}  
    user.save(function(err) {                       
      gateway.subscription.cancel(temp.braintreeid, function (err, result) {
        req.flash('success',{ msg: 'Your subscription has been deleted.' });
        res.redirect('/users/'+req.user.username+'/settings/billing');
        console.log(err,result)
      });
    });
  })
};


///////////////////////////////////////////////
/////  STREAM IN TRANSACTION HISTROY     ///// 
/////////////////////////////////////////////
exports.transaction_history = function(req, res) {
  if (req.user) {
      //where req.user.braintree id is the id saved on the local mongodb server.
      if (req.user.braintreeid) {
        var stream = require("stream");
        var customerStream = gateway.transaction.search(function (search) {
          search.customerId().is(req.user.braintreeid)
        });
        res.write("[");
        var first = true;       
        customerStream.on("data", function (customer) {
          if (first) {
            first = false;
            var temp =  JSON.stringify(customer);
          } else {
            var temp =  "," + JSON.stringify(customer);
          }
          res.write(temp);
        });
        customerStream.on("end", function () {
          res.write("]");
          res.end();
        });
      }
    } else {
      res.redirect('/signin');
    }
  };


////////////////////////////////////////////////
/////  STREAM IN SUBSCRIPTION HISTROY     ///// 
//////////////////////////////////////////////
exports.subscription_history = function(req, res) {
  if (req.user) {
      //where req.user.braintree id is the id saved on the local mongodb server.
      if (req.user.braintreeid) {
        var stream = require("stream");
        var customer_stream = gateway.customer.search(function (search) {
          search.id().is(req.user.braintreeid)
        });
        res.write("[");
        var first = true;       
        customer_stream.on("data", function (customer) {
          if (first) {
            first = false;
            var temp =  JSON.stringify(customer);
          } else {
            var temp =  "," + JSON.stringify(customer);
          }
          res.write(temp);
        });
        customer_stream.on("end", function () {
          res.write("]");
          res.end();
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
        if (!req.body.name) {
          user.name = ''
        } else {
          user.name = req.body.name;
        }
        if (!req.body.phone) {
          user.phone= ''
        } else {
         user.phone = req.body.phone;
       }
       if (!req.body.fax) {
        user.fax= ''
      } else {
        user.fax = req.body.fax;
      }
      if (!req.body.website) {
        user.website= ''
      } else {
        user.website = req.body.website;
      }
      if (req.body.location) {
        if (req.body.location == -1) {
          //do nothing 
        } else {
          user.location = req.body.location 
        }
      }
      user.save(function(err) {
        if (err && err.code === 11000) {
          req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
          return res.send()
        }  
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
  console.log('Vault Update ')
    //Perform Routing for Varios user type on the home page.
    if (req.user) {
      var errors = req.validationErrors();
      if (errors) {
        req.flash('error', errors);
        return res.redirect(  '/users/'+req.user.username+'/settings/billing/payment'  );
      }
      User.findById(req.user.id, function(err, user) {
        user.email = req.body.email;
        if (!req.body.name) {
          user.name = ''
        } else {
          user.name = req.body.name;
        }
        if (!req.body.phone) {
          user.phone= ''
        } else {
         user.phone = req.body.phone;
       }
       if (!req.body.fax) {
        user.fax= ''
      } else {
        user.fax = req.body.fax;
      }
      if (!req.body.website) {
        user.website= ''
      } else {
        user.website = req.body.website;
      }
      if (req.body.location) {
        if (req.body.location == -1) {
          //do nothing 
        } else {
          user.location = req.body.location 
        }
      }
        if (req.body.location) {
          if (req.body.location == -1) {
          //do nothing 
        } else {
         user.location = req.body.location 
       }
     }
     user.website = req.body.website;
     gateway.customer.update(user.braintreeid,{
      firstName: user.name,
      email: user.email,
      phone: user.phone,
      fax: user.fax ,
      website: user.website,
    }, function (err, result) {
      if(err){
        console.log('Error Here query1',err); return;
        req.flash('error',{ msg: '<div class="alert alert-warning" role="alert"> <strong>Warning!</strong> payment method error has occured <pre>'+err+'</pre> Please send us this warning.</div>' });
        return res.send()
      }
      if (result.errors) {
        var deepErrors = result.errors.deepErrors();
        for (var i in deepErrors) {
          if (deepErrors.hasOwnProperty(i)) {
            console.log(deepErrors[i].code);
            console.log(deepErrors[i].message);
            console.log(deepErrors[i].attribute);
            req.flash('error',{ msg: deepErrors[i].message });
          }
        }
        return res.send()
      } else {
         
          user.save(function(err) {
            gateway.customer.update(user.braintreeid,{
              creditCard: {
                paymentMethodNonce: req.body.payload,
              }
            }, function (err, result) {
              if(err){
                console.log('Error Here query1',err); return;
                req.flash('error',{ msg: '<div class="alert alert-warning" role="alert"> <strong>Warning!</strong> payment method error has occured <pre>'+err+'</pre> Please send us this warning.</div>' });
                return res.send()
              }
              if (result.errors) {
                var deepErrors = result.errors.deepErrors();
                for (var i in deepErrors) {
                  if (deepErrors.hasOwnProperty(i)) {

                    if (deepErrors[i].code == 91735) {
                      req.flash('success',{ msg: 'Client details modified. No changes to payment method.' });
                      return res.send()
                    }
                    if (deepErrors[i].code == 91738) {
                      req.flash('success',{ msg: 'Paypal account added.' });
                      return res.send()
                    }                  
                    console.log(deepErrors[i].code);
                    console.log(deepErrors[i].message);
                    console.log(deepErrors[i].attribute);
                    req.flash('error',{ msg: deepErrors[i].message });
                  }
                }
                return res.send()
              } else {
                req.flash('success',{ msg: 'Your payment details have been updated.' });
                return res.send()
              }
            })


          });
        
      }
    })



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
      gateway.customer.delete(req.user.braintreeid, function(err) {
        if(err){
         req.flash('error', { msg: 'Something went wrong here with braintreeid '+err+' .' });
         res.redirect('/users/'+user.username+'/settings/billing/payment');
         return;
       }
       User.findById(req.params.ids, function(err, user) {     
        user.braintreeid = ''
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