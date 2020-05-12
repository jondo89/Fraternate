# Fraternate

## What is Fraternate?

Fraternate is a standalone copy of the GitHub user subscription system. Fraternate is open-source, start by deploying as a boilerplate directly off GitHub , or use the npm module as a standalone plugin. Download the Full stack boilerplate using Node.js Mongodb Express.js Handlebars.js from Github.

### [VIEW THE DEMO - FRATERNATE](https://wrasse.herokuapp.com) or
### [VIEW THE NPM MODULE - FRATERNATE](https://www.npmjs.com/package/fraternate)

## Features

#### User Control

* Sign in / Login
* Signup
* Oauth GitHub / Google
* Unique Usernames
* Recaptcha
* Forgot Password
* Delete Account
* Public Profile
* Profile Pictures
* Email Notifications

#### Organization Control

* Create Organization
* Delete Organization
* Invite to Organization
* Request Invite to Organization
* Edit Memberships
* Unique Organization Names
* Public Organization Profile

#### Subscription Payments

* Braintree
* PayPal
* PayFast

#### Issue Tracking

* Stand alone issue/comment system
* Grouped issue/comment system

### The `.env` File

All of the magic on your localhost is managed by the `.env` file, here you would add your SMTP host setting, ReCaptcha keys etc. Some example values are shown below.

When installation is done on Heroku, the keys should be added to the Settings tab, in the "reveal config variable" area.

```ini
MAILGUN_USERNAME='postmaster@sandbox76aafffasdfasdaa6647bde82cd8fe0.mailgun.org'
MAILGUN_PASSWORD='f8738823asdfffdsaef64eb'

SESSION_SECRET='6681e3a9cb922b14ff4b5asdfassddfasdf23453f6e2792965d4e063'

MONGODB='localhost'

GOOGLE_ID='94259591sdf2716-lrvbstv8em4sugjmvs3asdvasdfu3jk6p6tgo0m74.apps.googleusercontent.com'
GOOGLE_SECRET='9G5ZoRsdfsvKQ-cKiT9M0sdfAhsb2E4g'

GITHUB_ID='800afdfd1f2'
GITHUB_SECRET='a875sdfsdfcbdb23265cf4f0'

SITE_KEY='6Le2acvsdfUAAAAAO8gaargn67-'
SECRET_KEY='6Le2aCcUsdftyjXP94Kc768FhbZr1kxBMMZ'

MAIL_PORT='587'
MAIL_USERNAME='xxxx@xxxx.com'
MAIL_HOST='xxx.xxxx.com'
MAIL_PASSWORD='xxsdasdasdasd'

MERCHANTID = 'xxcvdfgdfgdf'
PUBLICKEY = 'asdfghjasdf'
PRIVATEKEY = 'sdfrerewerasdf'

MERCHANTIDPAYFAST = 'dfgsq243r'
MERCHANTKEYPAYFAST = 'asdhdfhyhjtdj'
PASSPHRASEPAYFAST = 'asdf4tsgdfgsdfg'
URLPAYFAST = 'https://sandbox.payfast.co.za/eng/process'
```

The .env file contains all of the sites api and secret keys. Ensure that it exists on the server.

## License

MIT
