/*
  Super simple PayFast JS implementation with zero dependencies to other libraries.
  Certain functions pulled from all over the internet.
  
  Werner van Deventer (www.deventerprise.net)
*/

var createElement = (function () {
  // Detect IE using conditional compilation
  if (/*@cc_on@*//*@if (@_win32)!/*@end@*/false) {
    // Translations for attribute names which IE would otherwise choke on
    var attrTranslations =
        {
          "class": "className",
          "for": "htmlFor"
        };

    var setAttribute = function (element, attr, value) {
      if (attrTranslations.hasOwnProperty(attr)) {
        element[attrTranslations[attr]] = value;
      }
      else if (attr == "style") {
        element.style.cssText = value;
      }
      else {
        element.setAttribute(attr, value);
      }
    };

    return function (tagName, attributes) {
      attributes = attributes || {};

      // See http://channel9.msdn.com/Wiki/InternetExplorerProgrammingBugs
      if (attributes.hasOwnProperty("name") ||
                attributes.hasOwnProperty("checked") ||
                attributes.hasOwnProperty("multiple")) {
        var tagParts = ["<" + tagName];
        if (attributes.hasOwnProperty("name")) {
          tagParts[tagParts.length] = ' name="' + attributes.name + '"';
          delete attributes.name;
        }
        if (attributes.hasOwnProperty("checked") &&
                    "" + attributes.checked == "true") {
          tagParts[tagParts.length] = " checked";
          delete attributes.checked;
        }
        if (attributes.hasOwnProperty("multiple") &&
                    "" + attributes.multiple == "true") {
          tagParts[tagParts.length] = " multiple";
          delete attributes.multiple;
        }
        tagParts[tagParts.length] = ">";

        var element =
                    document.createElement(tagParts.join(""));
      }
      else {
        var element = document.createElement(tagName);
      }

      for (var attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
          setAttribute(element, attr, attributes[attr]);
        }
      }

      return element;
    };
  }
  // All other browsers
  else {
    return function (tagName, attributes) {
      attributes = attributes || {};
      var element = document.createElement(tagName);
      for (var attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
          element.setAttribute(attr, attributes[attr]);
        }
      }
      return element;
    };
  }
})();

function postToURL(url, values) {
  values = values || {};

  var form = createElement("form", { action: url,
    method: "POST",
    style: "display: none"
  });
  
  for (var property in values) {
    if (values.hasOwnProperty(property)) {
      var value = values[property];
      if (value instanceof Array) {
        for (var i = 0, l = value.length; i < l; i++) {
          form.appendChild(createElement("input", 
          { type: "hidden",
            name: property,
            value: value[i]
          }));
        }
      }
      else {
        form.appendChild(createElement("input", { type: "hidden",
          name: property,
          value: value
        }));
      }
    }
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function getParameter(parameterName) {
  // Add "=" to the parameter name (i.e. parameterName=value)
  var parameterName = parameterName + "=";
  var queryString = window.location.href.slice(window.location.href.indexOf('?') + 1);
  if (queryString.length > 0) {
    // Find the beginning of the string
    begin = queryString.indexOf(parameterName);
    // If the parameter name is not found, skip it, otherwise return the value
    if (begin != -1) {
      // Add the length (integer) to the beginning
      begin += parameterName.length;
      // Multiple parameters are separated by the "&" sign
      end = queryString.indexOf("&", begin);
      if (end == -1) {
        end = queryString.length;
      }
      
      return unescape(queryString.substring(begin, end));
    }
    
    // Nothing found
    return "null";
  }
}

function validatePayFastResponse(payFastUrl, merchantId) {
  // Incomplete, would be a good idea to add some sort of callback here to validate the payment.
  if (merchantId != getParameter('merchant_id')) {
    alert('Invalid merchant ID in the response.');
    return false;
  }
}

function quickPostPaymentToPayFast(payFastUrl) {
  // Input filds with the specifid names must be present in the page, whether hidden or as user input, the gateway does validation as well if you don't do it yourself.
  postPaymentToPayFast(payFastUrl,
                       document.getElementById('merchant_id').value, 
                       document.getElementById('merchant_key').value, 
                       document.getElementById('return_url').value, 
                       document.getElementById('cancel_url').value,
                       document.getElementById('notify_url').value,
                       document.getElementById('name_first').value,
                       document.getElementById('name_last').value,
                       document.getElementById('email_address').value,
                       document.getElementById('payment_id').value,
                       document.getElementById('amount').value,
                       document.getElementById('item_name').value,
                       document.getElementById('item_description').value,
                       document.getElementById('email_confirmation').value, 
                       document.getElementById('confirmation_address').value);
}

function postPaymentToPayFast(payFastUrl, merchantId, merchantKey, returnUrl, cancelUrl, notifyUrl,
                              nameFirst, nameLast, emailAddress, paymentId, amount, itemName, itemDescription,
                              emailConfirmation, confirmationAddress) {
  // Sandbox merchant.
  if (merchantId == '10000100') {
    alert('Use the password \'clientpass\' to login and make the test purchase.');
  }
      
  postToURL(payFastUrl, {'merchant_id':merchantId, 
                         'merchant_key':merchantKey,
                         'return_url':returnUrl,
                         'cancel_url':cancelUrl,
                         'notify_url':notifyUrl,
                         'name_first':nameFirst,
                         'name_last':nameLast,
                         'email_address':emailAddress,
                         'm_payment_id':paymentId,
                         'amount':amount,
                         'item_name':itemName,
                         'item_description':itemDescription,
                         'email_confirmation':emailConfirmation,
                         'confirmation_address':confirmationAddress });
}
