# Fraternate

## What is Fraternate?

Fraternate is a standalone copy of the GitHub user subscription system. Fraternate is open-source, start by deploying as a boilerplate directly off GitHub , or use the npm module as a standalone plugin. Download the Full stack boilerplate using Node.js Mongodb Express.js Handlebars.js from Github.

### [VIEW THE DEMO - FRATERNATE](https://fraternate.herokuapp.com/) 

## Installation
* Download the github file.
* Unzip into a new directory.
* Using your preferred command line editor , run NPM INSTALL.
* create your .env file in the root of the working folder structure (Copy the details below as the framework to get the site working).
* Add all of the relevant keys , passwords , usernames etc to the .env file. This is not configured to be user friendly , and will likely require a bit of messing around. 
* Run nodemon on the command prompt to start the server. 
* You will need the following items configured and functioning:
  * Mongodb installed and running on the localhost.
  * NPM installed and running.
  * Node.js installed and running.
* open the localhost i.e http://localhost:2000/

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

#### Issue Tracking

* Stand alone issue/comment system
* Grouped issue/comment system

### The `.env` File

All of the magic on your localhost is managed by the `.env` file, here you would add your SMTP host setting, ReCaptcha keys etc. Some example values are shown below.

When installation is done on Heroku, the keys should be added to the Settings tab, in the "reveal config variable" area.
```
MAILGUN_USERNAME=''
MAILGUN_PASSWORD=''
SESSION_SECRET=''
MONGODB=''
MONGODBNAME=''
MONGODBU=''
MONGODBP=''
MONGODBURI=''
GOOGLE_ID=''
GOOGLE_SECRET=''
API_KEY=''
TRACKINGCODEGA=''
GITHUB_ID=''
GITHUB_SECRET=''
SITE_KEY=''
SECRET_KEY=''
MAIL_PORT=''
MAIL_USERNAME=''
MAIL_HOST=''
MAIL_PASSWORD=''
MERCHANTID=''
PUBLICKEY=''
PRIVATEKEY=''
MERCHANTIDPAYFAST=''
MERCHANTKEYPAYFAST=''
PASSPHRASEPAYFAST=''
URLPAYFAST=''
LOCALHOSTPORT='4000'
WEBSITE='http://localhost:4000'
VERIFICATION_GOOGLE = ''
ROOTFOLDER=''
DEBUG='true'
DARKMODE = 'true'
```

The .env file contains all of the sites api and secret keys. Ensure that it exists on the server.

## License

MIT
