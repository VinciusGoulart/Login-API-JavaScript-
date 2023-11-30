module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'src/controllers/userController.js',
          dest: 'src/<%= pkg.name %>.min.js'
        }
      },
      jshint: {
        options: {
          esversion: 8,
          strict: "global",
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        },
        files: ['src/middlewares/auth.js'] 
      }
    });

  
  
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
  
 
    grunt.registerTask('default', ['jshint']);
  
  };