//Run with
//grunt
//View the registered helpers below to understand the scopes available.
const express = require('express');
var dotenv = require('dotenv');
dotenv.config()
var localhost = 'localhost:'+process.env.LOCALHOSTPORT
var myModule = require('./app.json');
var expected = myModule.website//Get the app.json details for the website.
var timestamp = new Date().getTime();
module.exports = function(grunt) {
	grunt.log.writeln('Starting the grunt');
	grunt.initConfig({
		bgShell: {
			_defaults: {
				bg: true  , execOpts: {
					cwd: './tasks'
				},
			},
			'runtest': {
    cmd: 'ls -la', // or function(){return 'ls -la'}
    execOpts: {
    	cwd: 'localhost:5000'
    },
    stdout: true,
    stderr: true,
    bg: false,
    fail: false,
    done: function(){}
 } 
},
nodemon: {
	dev: {
		script: 'index.js'
	}
},
run: {
	startServ: {
		options: {
			wait: false
		},
			//cmd: "executable",  
			args: [
			'c:/shiftbulk/index.js'
			]
		},runTests: {
			options: {
				wait: false
			},
			exec: 'npm run test:watch' // <-- use the exec key.
		},mongodump: {
			options: {
				wait: false
			},
			path: 'c:/Program Files/MongoDB/Server/4.0/bin/',
			exec: 'mongodump -h localhost:27017 -d '+process.env.MONGODBNAME+' -o ../../../../../'+process.env.MONGODBNAME+'/localhostDB' //This will generate a site map using the local host.
		}
	},
	shell: {
		sitemap: {
			command: [
			'node ./public/admin_localhostcrawler.js',
			'Need to run custom test here to look at all sitemap links'
			].join('&&') //This will generate a site map using the local host.
		},
		test: {
			command: [
			'node ./public/admin_test.js',
			].join('&&') //This will generate a site map using the local host.
		},
		nodemon: {
			command: [
			'nodemon',
			].join('&&') //This will generate a site map using the local host.
		},		
		mongodumpdb: {
			command: [
			'cd/Program Files/MongoDB/Server/4.0/bin/',
			'mongodump -h localhost:27017 -d '+process.env.MONGODBNAME+' -o ../../../../../'+process.env.MONGODBNAME+'/localhostDB',
			].join('&&')
		},mongodbsitepull: {
			command: [
			'cd/Program Files/MongoDB/Server/4.0/bin/',
			'mongo '+process.env.MONGODBNAME+' --eval "db.dropDatabase()"',
			//'mongodump  -h '+process.env.MONGODBURI+' -d '+process.env.MONGODBNAME+' -u '+process.env.MONGODBU+' -p '+process.env.MONGODBP+' -o backup/',
			'mongodump  --uri '+process.env.MONGODBURI+'',
			'mongorestore -h localhost:27017 -d '+process.env.MONGODBNAME+' dump/'+process.env.MONGODBNAME+'/'
			].join('&&')
		},seminibump: {
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'cd semini',
			'npm version patch',
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'npm publish semini',
			'cd..',			'cd..',			'cd..','cd shiftbulk',
			'del package-lock.json',
			].join('&&')
		},
		cleanerwrassebump: {
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'cd cleaner-wrasse',
			'npm version patch',
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'npm publish cleaner-wrasse',
			'cd..',			'cd..',			'cd..','cd shiftbulk',
			'del package-lock.json',
			].join('&&')
		},heavyliftingbump: {
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'cd heavylifting',
			'npm version patch',
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'npm publish heavylifting',
			'cd..',			'cd..',			'cd..','cd shiftbulk',
			'del package-lock.json',
			].join('&&')
		},fraternatebump: {
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'cd fraternate',
			'npm version patch',
			'cd..','cd..','cd..','cd shiftbulk',
			'cd node_modules',
			'npm publish fraternate',
			'cd..',			'cd..',			'cd..','cd shiftbulk',
			'del package-lock.json',
			].join('&&')
		},'savelatestsemini':{
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'npm install semini@latest --save',
			].join('&&')
		},
		'savelatestfraternate':{
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'npm install fraternate@latest --save'
			].join('&&')
		},
		'savelatestheavylifting':{
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'npm install heavylifting@latest --save',
			].join('&&')
		},
		'savelatestcleanerwrasse':{
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'npm install cleaner-wrasse@latest --save',
			].join('&&')
		},		'npmupdate':{
			command: [
			'cd..','cd..','cd..','cd shiftbulk',
			'npm update',
			].join('&&')
		},
		'openfile':openFile(),
	},
	zip_directories: {
		irep: {
			files: [{
				filter: 'isDirectory',
				expand: true,
				cwd: '../'+process.env.MONGODBNAME+'/localhostDB',
				src: ['*'],
				dest: '../'+process.env.MONGODBNAME+'/localhostDBbackup/'+timestamp+"_localcopy"
			}]
		}
	},
	concurrent: {
		options: {
			logConcurrentOutput: true
		},
		mongodbdumpandzip: [ ['shell:mongodumpdb','zip_directories'] ], //dump and zip the mongo database.
		mongodbpullfromserver: [ ['shell:mongodumpdb','zip_directories','shell:mongodbsitepull'] ], //dump and zip the mongo database.
		starttests: [ 'nodemon' ,['run:runTests', 'wait:runTests']],//Open a new nodemon and run the server.
		sitemapcreate: [ 'shell:sitemap' ],//Open a new nodemon and run the server.
		test: [ 'bgShell:runtest' ],//Open a new nodemon and run the server.
		bumpAll: [['shell:seminibump','shell:fraternatebump','shell:cleanerwrassebump' ,'shell:heavyliftingbump']]//Open a new nodemon and run the server.
	},  
	spell: {
		all: {
			src: ['views/*.txt'],
			options: {
				lang: 'en',
				ignore: ['cliches', 'double negatives']
			}
		}
	},
	copy: {
		overwritekeysharedfiles: {
			files: overwritekeysharedfiles()
		},	
		npmoverwritebtn: {files:npmoverwritebtn()}
		
	},
	open : {
		file : {
			path : '/views/css.handlebars'
		}
	}
});




function openFile(){
	var openString = ''
 	var fileName = grunt.option('filename'); //get value of target, my_module
	openString = {
		command: [
		'cd..','cd..','cd..','cd '+process.env.ROOTFOLDER,
		'sublime_text.exe "'+fileName+'"',
		].join('&&')
	}
	return openString
}

//grunt editfile --filename='/.env' 

grunt.registerTask('editfile',[
	'shell:openfile'
	]);



function	overwritekeysharedfiles(){
	var localFolderNames = ['c:/fraternate','c:/battlefront']
	var fileList = [
	'/testingfile.js',
	'/index.js',
	'/Gruntfile.js',
	'/public/custom.css',
		'/models/user.js',
	'/views/404.handlebars',
	'/views/500.handlebars',
	'/views/partials/css.handlebars',
	'/views/partials/javascript.handlebars',
	'/views/partials/topofpage.handlebars',
	'/views/partials/analytics.handlebars',
	'/views/partials/custom.handlebars'
	]
	var copyFiles = []
	for (var i = 0; i < localFolderNames.length; i++) {
		for (var j = 0; j < fileList.length; j++) {
			copyFiles.push(
			{ 
				src:"c:/shiftbulk"+fileList[j], 
				dest:localFolderNames[i]+fileList[j] 
			}
			)
		}
	}
	return copyFiles;
}


function	npmoverwritebtn(){
	var localFolderNames = ['c:/fraternate','c:/battlefront']
	var copyFiles = []
	var folderlist = [
		'tests/',
		'node_modules/fraternate/',
		'node_modules/heavylifting/',
		'node_modules/cleaner-wrasse/',
		'node_modules/semini/',
		'public/css/'
		//'node_modules/'  //use this , it just takes a while
	]


	for (var i = 0; i < localFolderNames.length; i++) {
		for (var j = 0; j < folderlist.length; j++) {
			copyFiles.push(
			{ 
				src:""+folderlist[j]+"**", 
				dest:localFolderNames[i] ,
				expand :true,
				nonull: true
			}
			)
		}
	}
	var fileList = [
	'/testingfile.js',
	'/index.js',
	'/models/user.js',
	'/Gruntfile.js',
	'/package.json',
	'/package-lock.json',
	'/public/custom.css',
	'/views/404.handlebars',
	'/views/500.handlebars',
	'/views/partials/css.handlebars',
	'/views/partials/javascript.handlebars',
	'/views/partials/topofpage.handlebars',
	'/views/partials/analytics.handlebars',
	'/views/partials/custom.handlebars',
	'/views/partials/navigation.handlebars'
	]

	for (var i = 0; i < localFolderNames.length; i++) {
		for (var j = 0; j < fileList.length; j++) {
			copyFiles.push(
			{ 
				src:"c:/shiftbulk"+fileList[j], 
				dest:localFolderNames[i]+fileList[j] 
			}
			)
		}
	}
return copyFiles;
}

grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-spell');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-zip-directories');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-run');
grunt.loadNpmTasks('grunt-open');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-bump');
grunt.loadNpmTasks('grunt-bg-shell');





//////////////////////////////////////
////    TASK REGISTRATION AREA   /////
//////////////////////////////////////
//Migration to the seminin interface
//////////////////////////////////////////////
grunt.registerTask('seminibump',[
	'shell:seminibump'
	]);
grunt.registerTask('fraternatebump',[
	'shell:fraternatebump'
	]);
grunt.registerTask('heavyliftingbump',[
	'shell:heavyliftingbump'
	]);
grunt.registerTask('cleanerwrassebump',[
	'shell:cleanerwrassebump'
	]);
grunt.registerTask('bumpall',[
	'concurrent:bumpAll'
	]);
//DANGER AREA
grunt.registerTask('savelatestsemini',[
	'shell:savelatestsemini'
	]);
grunt.registerTask('savelatestfraternate',[
	'shell:savelatestfraternate'
	]);
grunt.registerTask('savelatestcleanerwrasse',[
	'shell:savelatestcleanerwrasse'
	]);
grunt.registerTask('savelatestheavylifting',[
	'shell:savelatestheavylifting'
	]);
grunt.registerTask('npmupdate',[
	'shell:npmupdate'
	]);
//overwrite the key files that govern the interal file from shiftbulk to other.
grunt.registerTask('overwritekeysharedfiles',[
	'copy:overwritekeysharedfiles'
	]);
//overwrite the 4 key npm modules on the desktop for testing.
grunt.registerTask('npmoverwritebtn',[
	'copy:npmoverwritebtn'
	]);
//////////////////////////////////////////////
//Notes : these are used to backup from the server. the first is stepped , the second included the first. The first is for precautions.
//grunt mongodbdump //Used for dumping the current local database to /localhostdb , and saving as a zip in the dbbackup.
grunt.registerTask('mongodbdump',[
	'concurrent:mongodbdumpandzip'
	]);
//grunt mongodbpullfromserver //Used for dumping the current local database to /localhostdb , and saving as a zip in the dbbackup.
//// DANGER WILL ROBINSON DANGER /////
grunt.registerTask('mongodbpullfromserver',[
	'concurrent:mongodbpullfromserver'
	]);
//grunt runserveranddotests //start the nodemon server and perform tests.
grunt.registerTask('runserveranddotests',[
	'concurrent:starttests'
	]);
//grunt sitemap // update site map and run testing.
grunt.registerTask('sitemap',[
	'concurrent:sitemapcreate'
	]);
};





//Notes :  The registered helpers to follow are used to update the current webplatform to the latest working copy.
//1. Prompt which file to update : Fraternate ; Shiftbulk ; Battlefront.
//2. Notify the user the the current directory files will be migrated to the that selected folder.
	//Note : do not copy .env or heavylifting.json.
//3. Prompt to install NPM update.
//4. run npx depcheck to check for unused dependancies.
//5. Install the NPM update .
//6. Copy accross
	//6a. Site map
	//6b. Tests
	//6c. Grunt
//7. Nodemon the server.
//8. Run the tests.
//9. Need to set up the readme for NPM and github , using semini.
//10. Issue with the sitemap and robots.txt not being picked up.
//11. Remove unused JavaScript
//12. Reduce server response times (TTFB)
//13. warning Minify CSS
/*
module.exports = function(grunt) {
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'index.js'
			}
		},
		run: {
			startServ: {
				options: {
					wait: false
				},
        //cmd: "executable",  
        args: [
        '/index.js'
        ]
    },runTests: {
    	options: {
    		wait: false
    	},
       exec: 'npm run test:watch' // <-- use the exec key.
   },sitemap: {
    	options: {
    		wait: false
    	},
       exec: 'node ./public/admin_localhostcrawler.js' //This will generate a site map using the local host.
   }
},
open: {
	startServ: {
		path: localhost,
		app: 'Google Chrome'
	}
},
concurrent: {
	options: {
		logConcurrentOutput: true
	},
	//target1: ['nodemon'],
	//target2: ['run:runTests', 'wait:runTests']	
	target: [ 'nodemon','open:startServ',['run:runTests', 'wait:runTests'],['run:sitemap', 'wait:sitemap']]
}
});
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.registerTask('default',[
		'concurrent:target'
		]);
};*/

