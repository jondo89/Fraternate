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

////////////////////////////////////////////////////
//////////  BRAINTREE TRANSACTION LIST ////////////
//////////////////////////////////////////////////
exports.braintree = function(req, res) {
  res.render('braintree', {
    pagetitle: 'Braintree | '+sitename+'',
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
        //    search.id().is(req.user.braintreeid)
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
            res.render('settings/upgrade_plan_2',{
              pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });

         }else{
           gateway.clientToken.generate({}, function (err, response) {
            res.render('settings/upgrade_plan_2',{
              pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
              braintree_customer : JSON.stringify(customer),
              clientToken : response.clientToken
            })
          });
         }
       });
      } else {
        gateway.clientToken.generate({}, function (err, response) {
          res.render('settings/upgrade_plan_2',{
            pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
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
  if (req.user) {
    console.log('this is what we are doing 2.')
  } else {
    res.redirect('/signin');
  }
};

///////////////////////////////////////////
/////  CANCEL USER SUBSCRIPTIONS     ///// 
/////////////////////////////////////////
exports.cancel_subscription = function(req, res) {
  console.log(req.user)
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


