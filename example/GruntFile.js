module.exports = function(grunt) {

    var port = 9000;

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: "/* Example Game | MIT License */",

        concat: {

            lib: {

                options: {
                    banner: "<%= banner %>"
                },

                src: [
                    'lib/**/*.js'
                    ],
                dest: '<%= pkg.name %>.js'
            }

        },

        uglify: {

            lib: {

                options: {
                    banner: "<%= banner %>"
                },

                src: '<%= concat.lib.dest %>',
                dest: '<%= pkg.name %>.min.js'
            }

        },

        mocha: {
            test: {

                options: {
                    // mocha options
                    mocha: {
                        ignoreLeaks: false
                    },

                    reporter: 'Landing',
                    run: true,

                    urls: [
                        "http://localhost:" + port+1 + "/dest/test/index.html"
                    ]

                }

            }
        },

        connect: {
            test: {
                options: {
                    port: port+1,
                    base: "."
                }
            },

            server: {
                options: {
                    port: port,
                    keepalive: true,
                    base: "."
                }
            }
        },

        watch: {
            jade: {
                files: ["test/**/*.jade", "play.jade"],
                tasks: ["jade"]
            }
        },

        jade: {

            test: {

                css: [
                    "test/css/**/*.css"
                ],

                vendorjs: [
                    "test/js/**/*.js"
                ],

                testjs: [
                    "test/tests/**/*_test.js"
                ],

                options: {

                    data: {
                        css: "<%= grunt.file.expand(jade.test.css) %>",
                        vendorjs: "<%= grunt.file.expand(jade.test.vendorjs) %>",
                        testjs: "<%= grunt.file.expand(jade.test.testjs) %>",
                        lib: "<%= grunt.file.expand(concat.lib.src) %>"
                    }

                },

                files: {
                    "dest/test/index.html": ["test/index.jade"]
                }
            },

            play: {

                css: [
                    "assets/stylesheets/**/*.css"
                ],

                vendorjs: [
                    "assets/vendor/**/*.js"
                ],

                options: {
                    data: {
                        css: "<%= grunt.file.expand(jade.play.css) %>",
                        vendorjs: "<%= grunt.file.expand(jade.play.vendorjs) %>",
                        lib: "<%= grunt.file.expand(concat.lib.src) %>"
                    }
                },

                files: {
                    "dest/play.html": ["play.jade"]
                }

            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('test', ['build:test', 'connect:test', 'mocha:test']);
    grunt.registerTask("server", ["build:test", "connect:server"]);

    grunt.registerTask('build:test', ['jade']);
    grunt.registerTask('build:dev', ['concat:lib']);
    grunt.registerTask('build:release', ['build:dev', 'uglify:lib']);

    grunt.registerTask('default', ['test']);

};