'use strict';
module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        open: {
            server: {
                path: 'http://localhost:9009/'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9009,
                    //其他计算机可以访问
                    hostname: '0.0.0.0'/*,
                    keepalive: true*/
                }
            }
        },
        compass: {
            options: {
                sassDir: 'css',
                cssDir: 'css'
            },
            dist: {}
        },
        watch: {
            options: {
                livereload: true,
                debounceDelay: 250
            },
            scss: {
                files: ['css/*.scss'],
                tasks: ['compass']
            },
            css: {
                files: ['css/*.css']
            },
            html: {
                files: ['./*.html']
            },
            js: {
                files: ['js/**/*.js']
            }
        }
    });

    grunt.registerTask('default', [
        'connect:server',
        'open',
        'watch'
    ]);
};