<h1><a href="https://fraternate.herokuapp.com/" target="_blank">VIEW THE DEMO</a></h1>

<h3>What is Fraternate?</h3>
<p>Fraternate is a standalone copy of the GitHub user management system. Designed using a mongodB, NodeJS, expressjs and Handlebarsjs MVC (model view controller).</p>
<p>Fraternate should be used as a barebones boilerplate that can be modified to integrate into your sites custom content and allowing for a complete user management system.
This website has a direct copy hosted on GitHub to allow users to copy the functionality directly. </p>
<p>Follow the installation instructions to download, create a local deployment and begin development of your app with prebuilt user and organizational control. Including commercial integration to allow for paid subscription services.</p>

<h4 >MIT License - 100 % Open Source</h4>
Fraternate is completely open source.



<h4>User Control</h4>
<ul>
<li>Sign in / Login</li>
<li>Signup</li>
<li>Oauth GitHub / Google</li>
<li>Unique Usernames</li>
<li>Recaptcha</li>
<li>Forgot Password</li>
<li>Delete Account</li>
<li>Public Profile</li>
<li>Profile Pics</li>
<li>Email Notifications</li>
</ul>
<h4>Organization Control</h4>
<ul>
<li>Create Organization</li>
<li>Delete Organization</li>
<li>Invite to Organization</li>
<li>Request Invite to Organization</li>
<li>Edit Memberships</li>
<li>Unique Organization Names</li>
<li>Public Organization Profile</li>
</ul>



<h3>Installation Instructions</h3>
<p>If you would like to install Fraternate on your local development machine Fraternate requires the following components:</p>

<pre>
Node.js
MongodB
The GitHub Fraternate repo
NPM
expressjs
</pre>
<h3>In more detail.</h3>

<p>Install Node.js Download and install from the Node.js homepage.</p>

<pre><a href="https://nodejs.org/en/">https://nodejs.org/en/</a>&nbsp;</pre>

<p>Install mongodB | follow the set-up instructions on the website. (The trick is to create the c:/data/db directory then run mongod.exe). When in doubt the documentation on the site is very good. Download and install from the mongodB homepage.</p>

<pre><a href="https://www.mongodb.com/">https://www.mongodb.com/</a>&nbsp;</pre>

<p>Sign up for GitHub, install the windows GitHub client then clone the Fraternate repository.</p>
<p>Clone the repository on your hard drive, using the "clone or download" button on the GitHub front page for Fraternate.</p>
<p>Once downloaded, extract to the directory of your choice. For example:</p>

<pre>C:\Fraternate</pre>

<p>With node.js installed, the use of the NPM (Node Package Manager) service is now available from your command prompt, go into the directory where Fraternate was cloned using your preferred command prompt (DOS interface). For example:</p>

<pre>cd\Fraternate</pre>

<p>When you are at the command prompt in the correct directory, type in the following:</p>

<pre>npm install npm@latest -g</pre>

<p>The NPM service will now download and install into the cloned directory. The NPM service will now download and install into the cloned directory. When completed, enter the following:</p>

<pre>npm install</pre>

<p>To bring in the favicon (tab icons) server, use the following at the command prompt to install the favicon module.</p>

<pre>npm install serve-favicon</pre>

<p>To make life much easier, install nodemon. Nodemon provides some welcome server management for troublesome server crashes, type into the cmd(command) prompt:</p>

<pre>npm install -g nodemon</pre>

<p>To communicate between the mongo server and the client side, expressjs needs to be installed. type into the cmd prompt</p>

<pre>npm install express</pre>

<p>To send mails from the signup and contact page, nodemailer needs to be installed. type into the cmd prompt</p>

<pre>npm install nodemailer</pre>


<p>Robomongo is a very useful tool for viewing the mongodb database structure. Install from their website.</p>

<p>Download and install from the mongodb homepage.</p>

<pre><a href="https://robomongo.org/">https://robomongo.org/</a></pre>

<p>To ensure non-robotic users sign in and signup, install the express recaptcha package.</p>

<pre>npm install express-recaptcha -save</pre>


<h3>The .ENV File.</h3>
<p>All of the magic on your localhost is managed by the .ENV file , here you would add your smtp host setting , recaptcha keys etc. Some example values are shown below.</p>
<p>When installation is done on Heroku , the keys should be added to the Settings tab , in the "reveal config variable" area.</p>
<pre>
SESSION_SECRET='6681esdf3a9cb922b14ff4b5b3a9b03f95ba520e017f5a23453f6e2792965d4e063'

MONGODB='localhost'

GOOGLE_ID='942595912716-lrvbstvgdfd8em4sugjmvsu3jk6p6tgo0m74.apps.googleusercontent.com'
GOOGLE_SECRET='9G5ZoRffKQ-cKiT9M0Ahsb2E4g'

GITHUB_ID='800aa9e14a3asd6b3e981f2'
GITHUB_SECRET='a87511fe094gdffde0b71de968691cbdb23265cf4f0'

SITE_KEY='6Le2aCcUAAAAAO8g693sddE9uMACIv7L-DeAbDZc67-'
SECRET_KEY='6Le2aCcUAAAAANzOY5iqXP94Kc76sas8FsZr1kxBMMZ'

MAIL_PORT='451'
MAIL_USERNAME='bla@bla.com'
MAIL_PASSWORD='--- add your details here ---'
</pre>

<h3>Troubleshooting</h3>

<p>Issues with starting the server on the first installation is likely due to missing NPM modules, If the server is crashing try installation the following modules independently.</p>

<pre>npm install morgan
npm install compression
npm install method-override
npm install express-session
npm install express-flash
npm install body-parser
npm install express-validator
npm install dotenv
npm install express-handlebars
npm install passport
npm install mongoose
npm install async
npm install nodemailer
npm install crypto
npm install bcrypt-nodejs
npm install passport-google-oauth
npm install passport-local
npm install passport-github
</pre>

<p>If you are getting stuck, this is a port of the quality work done on Megaboilerplate. Here are the installation instructions for&nbsp;<a href="https://github.com/sahat/megaboilerplate#express">Megaboilerplate</a></p>

<p>If you are still having trouble use the contact page , or add an issue on the GitHub Repo.</p>

<h3>Server Installation.</h3>

<p>Here are a few points to consider when uploading onto the Heroku server.</p>

Server crash due to missing .env file.

<pre>The .env file contains all of the sites api and secret keys. Ensure that it exists on the server.</pre>


