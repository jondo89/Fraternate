var User = require('../../../models/User');
var braintree = require("braintree");
var organizationalModel      = require('../models/organizations.js');
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


///////////////////////////
/////  PAYMENTS      ///// 
/////////////////////////
exports.payment = function(req, res) {
  //Perform Routing for Various user type on the home page.
  if (req.user) {
    //Create client token for Braintree payments.
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, orgname) {
      if (orgname) {
        if (orgname.entry.braintreeid) {
          gateway.customer.find(orgname.entry.braintreeid, function(err, customer) {
            if (customer) {
             gateway.clientToken.generate({
              customerId: customer.id
            }, function (err, response) {
              res.render('../../../plugins/fraternate/views/orgsettings/payment',{
                pagetitle: 'Payment | '+sitename+'',
                braintree_customer : JSON.stringify(customer),
            orgowner : req.orgowner ,
            orgmember : req.orgmember ,
            organization : orgname,
            organizations : req.userorgs ,
                clientToken : response.clientToken
              })
            });
           }else{
             gateway.clientToken.generate({}, function (err, response) {
              res.render('../../../plugins/fraternate/views/orgsettings/payment',{
                pagetitle: 'Payment | '+sitename+'',
                braintree_customer : JSON.stringify(customer),
                orgowner : req.orgowner ,
                orgmember : req.orgmember ,
                organization : orgname,
                organizations : req.userorgs ,
                clientToken : response.clientToken
              })
            });
           }
         });
        } else {
          gateway.clientToken.generate({}, function (err, response) {
            res.render('../../../plugins/fraternate/views/orgsettings/payment',{
              pagetitle: 'Payment | '+sitename+'',
              clientToken : response.clientToken,
              orgowner : req.orgowner ,
              orgmember : req.orgmember ,
              organization : orgname,
              organizations : req.userorgs ,
            })
          });
        }
      } else {
        return res.redirect('/signin');
      }
    })
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
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, orgname) {
      if (orgname) {
        if (orgname.entry.braintreeid) {
          gateway.customer.find(orgname.entry.braintreeid, function(err, customer) {
            if (customer) {
             gateway.clientToken.generate({
                customerId: customer.id
            }, function (err, response) {
          res.render('../../../plugins/fraternate/views/orgsettings/upgrade',{
            pagetitle: 'Upgrade | '+sitename+'',
            braintree_customer : JSON.stringify(customer),
            clientToken : response.clientToken,
            orgowner : req.orgowner ,
            orgmember : req.orgmember ,
            organization : orgname,
            organizations : req.userorgs ,
          })
        });
       }else{
         gateway.clientToken.generate({}, function (err, response) {
          res.render('../../../plugins/fraternate/views/orgsettings/upgrade',{
            pagetitle: 'Upgrade | '+sitename+'',
            braintree_customer : JSON.stringify(customer),
            clientToken : response.clientToken,
            orgowner : req.orgowner ,
            orgmember : req.orgmember ,
            organization : orgname,
            organizations : req.userorgs ,
          })
        });
       }
     });
    } else {
      gateway.clientToken.generate({}, function (err, response) {
        res.render('../../../plugins/fraternate/views/orgsettings/payment',{
          pagetitle: 'Payment | '+sitename+'',
          clientToken : response.clientToken,
          orgowner : req.orgowner ,
          orgmember : req.orgmember ,
          organization : orgname,
          organizations : req.userorgs ,
        })
      });
    }
} 
});

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
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, orgname) {
      if (orgname) {
        if (orgname.entry.braintreeid) {
          gateway.customer.find(orgname.entry.braintreeid, function(err, customer) {
            if (customer) {
             gateway.clientToken.generate({
                customerId: customer.id
            }, function (err, response) {
          res.render('../../../plugins/fraternate/views/orgsettings/upgrade_plan_2',{
            pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
            braintree_customer : JSON.stringify(customer),
            clientToken : response.clientToken,
            orgowner : req.orgowner ,
            orgmember : req.orgmember ,
            organization : orgname,
            organizations : req.userorgs ,
          })
        });
       }else{
         gateway.clientToken.generate({}, function (err, response) {
          res.render('../../../plugins/fraternate/views/orgsettings/upgrade_plan_2',{
            pagetitle: 'Upgrade Yearly Plan | '+sitename+'',
            braintree_customer : JSON.stringify(customer),
            clientToken : response.clientToken,
            orgowner : req.orgowner ,
            orgmember : req.orgmember ,
            organization : orgname,
            organizations : req.userorgs ,
          })
        });
       }
     });
    } else {
      gateway.clientToken.generate({}, function (err, response) {
        res.render('../../../plugins/fraternate/views/orgsettings/payment',{
          pagetitle: 'Payment | '+sitename+'',
          clientToken : response.clientToken,
          orgowner : req.orgowner ,
          orgmember : req.orgmember ,
          organization : orgname,
          organizations : req.userorgs ,
        })
      });
    }
    } 
});
  } else {
    res.redirect('/signin');
  }
};

///////////////////////////////////////
/////  SUBSCRIPTION - PLAN 1     ///// 
/////////////////////////////////////
exports.subscription = function(req, res) {
  var plan = "j2d2"
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
  var plan = "b36w"
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
        res.redirect('/organizations/'+req.user.username+'/settings/billing');
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
  console.log('Vault')
  //Perform Routing for Varios user type on the home page.
  if (req.user) {
    var errors = req.validationErrors();
    if (errors) {
      req.flash('error', errors);
      return res.redirect(  '/organizations/'+req.params.orgname+'/settings/billing/payment'  );
    }
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, organizationItem) {
      organizationalModel.findById(organizationItem._id, function (err, orgid) {
        if (err) return handleError(err);
        if (orgid) { 
    //Painful parse issue.
    var temp = JSON.parse(JSON.stringify(orgid.entry))








      //This can surely be improved.
      if (req.body.name !=null) {
       temp.name = req.body.name
     }

     
     if (req.body.displayname) {
       temp.displayname = req.body.displayname
     }


     if (req.body.description) {
      temp.description = req.body.description
    }


    if (req.body.location) {
      if (req.body.location == -1) {
        //do nothing 
      } else {
        temp.location = req.body.location 
      }
    }

    if (req.body.url) {
     temp.url = req.body.url
   }


   if (req.body.business_billing_name) {
     temp.business_billing_name = req.body.business_billing_name
   } else {
    delete temp.business_billing_name 
  }


  if (req.body.email) {
   temp.email = req.body.email
 }     


 if (req.body.phone) {
   temp.phone = req.body.phone
 }     


 if (req.body.fax) {
   temp.fax = req.body.fax
 }     





 gateway.customer.create({
  Company : temp.business_billing_name ,
  firstName: temp.name,
  email: temp.email,
  phone: temp.phone,
  fax: temp.fax ,
  website: temp.url,
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
    temp.braintreeid = result.customer.id
    orgid.entry = temp    
    orgid.save(function(err,doc) {
      req.flash('success',{ msg: 'Your payment details have been updated.' });
      return res.send()
    });
  }
}
});
} else {
  req.flash('error', { msg: 'Something went wrong here.' });
  res.redirect('/organizations/'+req.params.orgname+'/settings/profile');
}
});
    })
  } else {
    res.redirect('/signin');
  }
};

//////////////////////////////
/////  VAULT UPDATE     ///// 
////////////////////////////
exports.vaultupdate = function(req, res) {
  console.log('Vault Update')
  //Perform Routing for Varios user type on the home page.
  if (req.user) {
    var errors = req.validationErrors();
    if (errors) {
      console.log('debug 1')
      req.flash('error', errors);
      return res.redirect(  '/organizations/'+req.params.orgname+'/settings/billing/payment'  );
    }
    organizationalModel.findOne({ 'entry.name': req.params.orgname }, function(err, organizationItem) {
      organizationalModel.findById(organizationItem._id, function (err, orgid) {
        if (err) return handleError(err);
        if (orgid) { 
    //Painful parse issue.
    var temp = JSON.parse(JSON.stringify(orgid.entry))
    if (req.body.location) {
      if (req.body.location == -1) {
        //do nothing 
      } else {
        temp.location = req.body.location 
      }
    }
    if (req.body.url) {
     temp.url = req.body.url
   }else {
    delete temp.url 
  }
  if (req.body.business_billing_name) {
   temp.business_billing_name = req.body.business_billing_name
 } else {
  delete temp.business_billing_name 
}
if (req.body.email) {
 temp.email = req.body.email
}    else {
  delete temp.email 
} 
if (req.body.phone) {
  temp.phone = req.body.phone
} else {
  delete temp.phone 
}
if (req.body.fax) {
  temp.fax = req.body.fax
}     else {
  delete temp.fax 
}
if (temp.business_billing_name) {
  var names = temp.business_billing_name
} else {
  var names = temp.name
}
gateway.customer.update(temp.braintreeid,{
  Company : names ,
  firstName: temp.name,
  email: temp.email,
  phone: temp.phone,
  fax: temp.fax ,
  website: temp.url,
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
    orgid.entry = temp  
    orgid.save(function(err,doc) {
     gateway.customer.update(temp.braintreeid,{
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
}
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
    organizationalModel.findById(req.params.ids, function (err, orgid) {
      gateway.customer.delete(orgid.entry.braintreeid, function(err) {
        if(err){
         req.flash('error', { msg: 'Something went wrong here with braintreeid '+err+' .' });
         res.redirect('/organizations/'+orgid.entry.name+'/settings/billing/payment');
         return;
       }
var temp = JSON.parse(JSON.stringify(orgid.entry))
delete temp.braintreeid
orgid.entry = temp
       orgid.save(function(err) {
        if(err){
         req.flash('error', { msg: 'Something went wrong here '+err+' .' });
         res.redirect('/organizations/'+orgid.entry.name+'/settings/billing/payment');
         return;
       }
       req.flash('success', { msg: 'Payment details for '+orgid.entry.name+' have be deleted from Braintree Vault.' });
       res.redirect('/organizations/'+orgid.entry.name+'/settings/billing/payment');
       return;
     });
     });
    });
  } else {
    res.redirect('/signin');
  }
};