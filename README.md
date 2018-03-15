# Fraternate

### [VIEW THE DEMO](https://fraternate.herokuapp.com)

## What is Fraternate?

Fraternate is a standalone copy of the GitHub user management system. Designed using a MongodB, NodeJS, Express.js and Handlebarsjs MVC (model view controller).

Fraternate should be used as a barebones boilerplate that can be modified to integrate into your sites custom content and allowing for a complete user management system.

This website has a direct copy hosted on GitHub to allow users to copy the functionality directly.

Follow the installation instructions to download, create a local deployment and begin development of your app with prebuilt user and organizational control. Including commercial integration to allow for paid subscription services.

### MIT License - 100% Open Source

Fraternate is completely open source.

## Install

```bash
npm install fraternate
```

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

### Installation Instructions

If you would like to install Fraternate on your local development machine Fraternate requires the following components:

* Node.js
* MongodB
* The GitHub Fraternate repo
* npm
* expressjs

### Note.

Fraternate is comprised of 2 parts; the (long term) standalone npm module, and a copy of this website on GitHub. As the website and npm module are intertwined at the moment, it is best to start with a fork of the GitHub repository and figure out what you would like to keep and throw away from there..

### In more detail.

Install Node.js Download and install from the Node.js homepage.

<https://nodejs.org/en>

Install MongodB | follow the set-up instructions on the website. (For Windows, the trick is to create the `C:/data/db directory` then run `mongod.exe`). When in doubt the documentation on the site is very good. Download and install from the MongodB homepage.

<https://www.mongodb.com>

Sign up for GitHub, install the windows GitHub client then clone the Fraternate repository.
Clone the repository on your hard drive, using the "clone or download" button on the GitHub front page for Fraternate.

<https://github.com/Isithelo/Fraternate.git>

Once downloaded, extract to the directory of your choice. For example:

```
C:\Fraternate
```

With node.js installed, the use of the npm (Node Package Manager) service is now available from your command prompt, go into the directory where Fraternate was cloned using your preferred command prompt (DOS interface). For example:

```
cd Fraternate
```

When you are at the command prompt in the correct directory, type in the following:

`npm install npm@latest -g`

The npm service will now download and install into the cloned directory. The npm service will now download and install into the cloned directory. When completed, enter the following:

```bash
npm install
```

RoboMongo is a very useful tool for viewing the mongodb database structure. Install from their website.

Download and install from the mongodb homepage:

<https://robomongo.org>

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

### Troubleshooting

Issues with starting the server on the first installation is likely due to missing npm modules, If the server is crashing try installation the following modules independently.

```json
{
  "name": "Fraternate",
  "version": "1.0.0",
  "description": "My app description",
  "scripts": {
    "deploy": "npm test && git push heroku master",
    "start": "node server.js"
  },
  "dependencies": {
    "async": "^1.5.2",
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.18.2",
    "braintree": "^2.5.0",
    "compression": "^1.7.1",
    "crypto": "0.0.3",
    "dotenv": "^2.0.0",
    "express": "^4.16.2",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-recaptcha": "^2.3.0",
    "express-session": "^1.15.6",
    "express-validator": "^2.21.0",
    "flash": "^1.1.0",
    "fraternate": "^1.1.14",
    "heavylifting": "^1.2.12",
    "method-override": "^2.3.10",
    "mongoose": "^4.13.10",
    "morgan": "^1.9.0",
    "nodemailer": "^2.7.2",
    "passport": "^0.3.2",
    "passport-github": "^1.1.0",
    "passport-google-oauth": "^1.0.0",
    "passport-local": "^1.0.0",
    "serve-favicon": "^2.4.5"
  },
  "devDependencies": {},
  "engines": {
    "node": "6.11.1"
  }
}
```

If you are getting stuck, this is a port of the quality work done on Megaboilerplate. Here are the installation instructions for [Megaboilerplate](https://github.com/sahat/megaboilerplate#express)

If you are still having trouble use the contact page , or add an issue on the GitHub Repo.

### Server Installation.

Here are a few points to consider when uploading onto the Heroku server.

#### Server crash due to missing .env file.

The .env file contains all of the sites api and secret keys. Ensure that it exists on the server.

## License

MIT
