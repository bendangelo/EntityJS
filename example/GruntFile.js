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

                src: '<%= concat.lib.dist %>',
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
                        "http://localhost:" + port+1 + "/dist/test/index.html"
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

                testcss: [
                    "test/css/**/*.css"
                ],

                css: [
                    "assets/stylesheets/**/*.css"
                ],

                testvendorjs: [
                    "test/js/**/*.js"
                ],

                testjs: [
                    "test/tests/**/*_test.js"
                ],

                vendorjs: [
                    "assets/vendor/**/*.js"
                ],

                options: {
                    pretty: true,
                    data: {
                        testcss: "<%= grunt.file.expand(jade.test.testcss) %>",
                        css: "<%= grunt.file.expand(jade.test.css) %>",
                        testvendorjs: "<%= grunt.file.expand(jade.test.testvendorjs) %>",
                        vendorjs: "<%= grunt.file.expand(jade.test.vendorjs) %>",
                        testjs: "<%= grunt.file.expand(jade.test.testjs) %>",
                        lib: "<%= grunt.file.expand(concat.lib.src) %>"
                    }

                },

                files: {
                    "dist/test/index.html": ["test/index.jade"]
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
                    pretty: true,
                    data: {
                        css: "<%= grunt.file.expand(jade.play.css) %>",
                        vendorjs: "<%= grunt.file.expand(jade.play.vendorjs) %>",
                        lib: "<%= grunt.file.expand(concat.lib.src) %>"
                    }
                },

                files: {
                    "dist/test/play.html": ["test/play.jade"]
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