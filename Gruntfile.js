module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: { // "app" target - this creates min safe versions of each file you speficy:
                files: {
                    './public/min-safe/app/app.js': ['./public/app/app.js'],
                    './public/min-safe/app/controllers/controllers.js': ['./public/app/controllers/*.js'],
                    './public/min-safe/app/services/services.js': ['./public/app/services/*.js']
                }
            }
        },
        concat: {
            js: {
                src: [
                    './public/min-safe/app/app.js',
                    './public/min-safe/app/services/*.js',
                    './public/min-safe/app/controllers/*.js'
                ],
                dest: './public/min/app.js'
            },
            vendor: { 
                src: [
                    './public/bower_components/jquery/dist/jquery.min.js',
                    './public/bower_components/angular/angular.min.js',
                    './public/bower_components/angular-route/angular-route.min.js',
                    './public/bower_components/angular-sanitize/angular-sanitize.min.js',
                    './public/bower_components/angular-resource/angular-resource.min.js'
                ],
                dest: './public/min/vendor.js'
            }

        },
        uglify: {
            js: { // target
                src: ['./public/min/app.js'],
                dest: './public/min/app.js'
            },
            vendor: { // target
                src: ['./public/min/vendor.js'],
                dest: './public/min/vendor.js'
            }
        }



        //grunt task configuration will go here     
    });

    //load grunt task
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}