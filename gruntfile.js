module.exports = function(grunt){

  //config
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      apx: ['*.js','lib/*.js','test/*.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/init.js','test/*.test.js']
      }
    },
    watch: {
      dev: {
        files: ['*.js','lib/*.js','test/*.js'],
        tasks: ['test']
      }
    },
    projectUpdate: {
      update: {}
    }
  })

  //load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-project-update')

  //macros
  grunt.registerTask('update',['projectUpdate'])
  grunt.registerTask('test',['jshint','mochaTest:test'])
  grunt.registerTask('dev',['watch:dev'])
  grunt.registerTask('start',['nodemon:production'])

}