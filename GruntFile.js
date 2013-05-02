module.exports = function(grunt) {

    var port = 3000;

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: "/* Entity Game Engine | MIT License */\n",

        concat: {

            lib: {

                options: {
                    banner: "<%= banner %>\n(function(window){",
                    footer: "})(this);"
                },

                src: [
                    'lib/header.js',
                    'lib/vendor/fiber.js',
                    'lib/core/class.js',
                    'lib/core/events.js',
                    'lib/core/*.js',
                    'lib/**/!(footer).js',
                    'lib/footer.js'
                    ],
                dest: 'example/assets/vendor/<%= pkg.name %>.js'
            }

        },

        uglify: {

            lib: {

                options: {
                    banner: "<%= banner %>"
                },

                src: 'example/assets/vendor/<%= pkg.name %>.js',
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
                    "example/test/js/**/*.js"
                ],

                testjs: [
                    'dist/test/tests/**/*.js'
                ],

                options: {
                    pretty: true,
                    data: {
                        css: "<%= grunt.file.expand(jade.test.css) %>",
                        vendorjs: "<%= grunt.file.expand(jade.test.vendorjs) %>",
                        testjs: "<%= grunt.file.expand(jade.test.testjs) %>",
                        lib: "<%= grunt.file.expand(concat.lib.src) %>"
                    }

                },

                files: {
                    "dist/test/index.html": ["test/index.jade"]
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
                dest: "dist/test/tests",
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

    grunt.registerTask('default', ['build:test', 'build:release', 'server']);

};