module.exports = function(grunt) {

    var port = 9000;

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        replace: {
            test: {
                options: {

                    css: [
                        "example/test/css/**/*.css"
                    ],

                    js: [
                        "example/test/js/**/*.js"
                    ],

                    variables: {
                        css: "<%= grunt.cssTag(replace.test.options.css) %>",
                        testjs: "<%= grunt.jsTag(replace.test.options.js) %>",
                        js: "<%= grunt.jsTag(concat.lib.src) %>"
                    },

                    prefix: "@@"

                },

                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ["test/test.html"],
                        dest: "dest/"
                    }
                ]
            }
        },

        concat: {

            lib: {

                options: {
                    banner: '/* <%= pkg.name %> V<%= pkg.version %> */\n',
                    linefeed: ";",
                    // footer: "}(this));",
                    process: "true"
                },

                src: [
                    'lib/core/header.js',
                    'lib/core/utils/*.js',
                    'lib/core/entity.js',
                    'lib/core/managers/manager.js',
                    'lib/core/systems/system.js',
                    'lib/core/**/*.js'
                    ],
                dest: 'example/assets/vendor/<%= pkg.name %>.js'
            },

            test: {
                src: [
                    "test/test_helper.js",
                    'test/**/*_test.js'
                    ],
                dest: 'dest/tests.js'
            }

        },

        uglify: {

            build: {
                src: 'example/assets/vendor/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }

        },

        watch: {
            test: {
                files: ["lib/**/*.js", "test/**/*_test.js"],
                tasks: ["test"]
            },

            all: {
                files: ["lib/**/*.js", "test/**/*_test.js"],
                tasks: ["concat"]
            },

            lib: {
                files: ["lib/**/*.js"],
                tasks: ["concat:lib"]
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

    grunt.jsTag = function(array){
        return array.map(function(i){
            var expanded = grunt.file.expand(i);
            return expanded.map(function(r){
                return "<script src='"+r+"'></script>";
            }).join("\n");
        }).join("\n");
    };

    grunt.cssTag = function(array){
        return array.map(function(i){
            var expanded = grunt.file.expand(i);
            return expanded.map(function(r){
                return "<link href='"+r+"' rel='stylesheet' type='text/css'></link>";
            }).join("\n");
        }).join("\n");
    };

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dox');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('test', ['concat', 'connect:test', 'mocha:test']);
    grunt.registerTask('autotest', ["watch:test"]);
    grunt.registerTask("server", ["connect:server"]);

    grunt.registerTask('build', ['concat:lib', 'uglify', 'dox']);

    grunt.registerTask('default', ['build', 'test']);

};