<h2>Fraternate Installation Instructions</h2>
  <h1><a href="https://fraternate.herokuapp.com/" target="_blank">DEMO</a></h1>

<h3>Fraternate Installation Instructions</h3>
  
<p>In summary Fraternate requires the following: </p>
<ul>
  <li>Node.js</li>
  <li>Mongodb</li>
  <li>The GitHub Fraternate repo</li>
  <li>NPM</li>
  <li>serve-favicon</li>
  <li>express</li>
</ul>

<p>In more detail.</p>

<ul>
<li>Step 1 - Install Node.js</li>
<pre>
Download and install from the Node.js homepage.
<a href="https://nodejs.org/en/" target="_blank">https://nodejs.org/en/</a>  
</pre>

<li>Step 2 - Install mongdb | follow the set up instructions on the website. (The trick is to create the c:/data/db directory then run mongod.exe). When in doubt the documentation on the site is very good.</li>

<pre>
Download and install from the mongodb homepage.
<a href="https://www.mongodb.com/" target="_blank">https://www.mongodb.com/</a>  
</pre>

<li>Step 3 - Sign up for Github , install the windows gihub client then clone the Fraternate repository.</li>
<p>Clone the repository on your hard drive, using the "clone or download" button on the GitHub front page for Fraternate.</p>
<p>Once downloaded, extract to the directory of your choice. For example: </p>

<pre>
C:\ Fraternate
</pre>

<li>Step 4 - With node.js installed, the use of the NPM service is now available from your command prompt, go into the directory where Fraternate was cloned using your preferred command prompt (DOS interface). For example: </li>

<pre>
cd\ Fraternate
</pre>
<p>When you are at the command prompt in the correct directory, type in the following:</p>

<pre>npm install npm@latest -g</pre> 

<p>
The NPM service will now download and install into the cloned directory. The NPM service will now download and install into the cloned directory. When completed , enter the following:
</p>

<pre>npm install</pre>
 

<li>In order to bring in the favicon (tab icons) server, use the following at the command prompt to install the favicon module.
</li>
<pre>npm install serve-favicon</pre>


<li>To make life much easier, install nodemon. Nodemon provides some welcome server management for troublesome server crashes , type into the cmd(command) prompt: 
</li>
<pre>npm install -g nodemon</pre>


<li>In order to communicate between the mongo server and the client side , expressjs needs to be installed. type into the cmd prompt 
</li>
<pre>npm install express</pre>

<li>In order to send mails from the signup and contact page , nodemailer needs to be installed. type into the cmd prompt 
</li>
<pre>npm install nodemailer</pre>

<li>Robomongo is a very useful tool for viewing the mongodb database structure. Install from their website.
<pre>
Download and install from the mongodb homepage.
<a href="https://robomongo.org/" target="_blank">https://robomongo.org/</a>  
</pre>


<li>To ensure non-robotic users signin and signup , install the express recaptcha package.
</li>
<pre>npm install express-recaptcha --save</pre>

<li>Dependant on the version of expressjs installed , the following may be required.
</li>
<pre>
npm install morgan
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



</ul>
 
 

<p>If you are getting stuck , this is a port of the quality work done on Megaboilerplate. Here are the installation instructions for <a href="https://github.com/sahat/megaboilerplate#express" target="_blank">Megaboilerplate</a></p>
