/**
 * Configure which files to watch and what to do when they change.
 */
module.exports = {
    options: {
        nospawn: true,
        livereload: true
    },
    scripts: {
        files: [
            'public/scripts/**/*.js',
            'public/stylesheets/**/*.css',  // watch these files
            'test/e2e/**/*.js'
        ],
        tasks: ['cssmin', 'jshint', 'karma'/*, 'vulcanize'*/]  // run these commands
    }
};
