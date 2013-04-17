module.exports = function(grunt) {

    var port = 9000;

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: "/* Entity Game Engine | MIT License */\n",

        concat: {

            lib: {

                options: {
                    banner: "<%= banner %>"
                },

                src: [
                    'lib/core/re.js',
                    'lib/util/extend.js',
                    'lib/core/base.js',
                    'lib/core/*.js',
                    'lib/**/*.js'
                    ],
                dest: 'example/assets/vendor/<%= pkg.name %>.js'
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

        watch: {
            coffee: {
                files: ["test/tests/**/*.coffee"],
                tasks: ["coffee:test"]
            },
            jade: {
                files: ["test/index.jade"],
                tasks: ["jade:test"]
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
                        "http://localhost:" + port+1 + "/test/index.html"
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

        jade: {

            test: {

                css: [
                    "example/test/css/**/*.css"
                ],

                vendorjs: [
                    "example/test/js/**/*.js",
                    "test/js/**/*.js"
                ],

                testjs: [
                    'dest/test/tests/**/*_test.js'
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
            }
        },

        coffee: {

            test: {
                expand: true,
                cwd: "test/tests",
                src: [
                    "**/*.coffee"
                ],
                dest: "dest/test/tests",
                ext: ".js"
            }

        },

        dox: {
            options: {
                title: "Entity Documentation"
            },
            files: {
                src: ['lib/**/*.js'],
                dest: 'docs'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dox');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('test', ['build:test', 'connect:test', 'mocha:test']);
    grunt.registerTask("server", ["build:test", "connect:server"]);

    grunt.registerTask('build:test', ['coffee:test', 'jade:test']);
    grunt.registerTask('build:dev', ['concat:lib']);
    grunt.registerTask('build:release', ['build:dev', 'uglify:lib', 'dox']);

    grunt.registerTask('default', ['build:test', 'build:release']);

};