module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
            watch: {
                sass: {
                files: 'resources/sass/*.scss',
                tasks: ['sass']
                }
        },
        concat: {
            options: {
                separator: '\n \n ',
             },
            dist: {
                src: ['bower_components/jquery/dist/jquery.js','bower_components/bootstrap-sass/assets/javascripts/bootstrap.js','bower_components/axios/dist/axios.min.js','resources/javascripts/main.js'],
                dest: 'resources/javascripts/bin/main.js',
            }
        },
        uglify: {
            options: {
            mangle:false
            },
            my_target: {
            files: {
                'resources/javascripts/bin/main.min.js': ['resources/javascripts/bin/main.js']
            }
            }
        },
        sass: {
            dist: {
            files: {
                'resources/css/app.css' : 'resources/sass/app.scss',
            }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //Tasks
    grunt.registerTask('CompileJavaScript', ['concat','uglify']);
    grunt.registerTask('default', ['concat','uglify']);

}