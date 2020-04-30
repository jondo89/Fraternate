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
        'c:/fraternate/index.js'
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
       exec: 'node ./public/mycrawler.js' // <-- use the exec key.
   }
},
open: {
	startServ: {
		path: 'http://localhost:4000',
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
};