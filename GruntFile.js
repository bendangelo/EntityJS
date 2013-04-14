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
                        "example/test/js/**/*.js",
                        "test/js/**/*.js"
                    ],

                    variables: {
                        css: "<%= grunt.cssTag(replace.test.options.css) %>",
                        vendorjs: "<%= grunt.jsTag(replace.test.options.js) %>",
                        testjs: "<%= grunt.jsTag('dest/tests/**/*_test.js') %>",
                        js: "<%= grunt.jsTag(concat.lib.src) %>"
                    },

                    prefix: "@@"

                },

                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ["test/index.html"],
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
                    process: "true"
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

            build: {
                src: 'example/assets/vendor/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }

        },

        watch: {
            coffee: {
                files: ["test/tests/**/*.coffee"],
                tasks: ["coffee:test"]
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

        coffee: {

            test: {
                expand: true,
                cwd: "test/tests",
                src: [
                    "**/*.coffee"
                ],
                dest: "dest/tests",
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

    grunt.jsTag = function(array){
        var files = grunt.file.expand(array);

        return files.map(function(i){
            return "<script src='/"+i+"'></script>";
        }).join("\n");
    };

    grunt.cssTag = function(array){
        var files = grunt.file.expand(array);
        return files.map(function(i){
            return "<link href='/"+i+"' rel='stylesheet' type='text/css'></link>";
        }).join("\n");
    };

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dox');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('test', ['build:test', 'connect:test', 'mocha:test']);
    grunt.registerTask("server", ["build:test", "connect:server"]);

    grunt.registerTask('build:test', ['coffee:test', 'replace']);
    grunt.registerTask('build:dev', ['uglify', 'dox']);
    grunt.registerTask('build:release', ['build:dev', 'uglify', 'dox']);

    grunt.registerTask('default', ['build', 'test']);

};