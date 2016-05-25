/**
 * Configure which files to run jshint on.
 *
 * Feel free to adjust the jshint rules in .jshintrc.  http://jshint.com/docs/options/
 */
module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    src: [
        'public/scripts/**/*.js',
        '!public/scripts/modules/sample-module/draggable-tree-nodes.js',
        '!public/scripts/modules/sample-module/bars-directive.js',
        '!public/scripts/modules/sample-module/mini-tree.js',
        '!public/scripts/modules/sample-module/fractal-tree-config.js',
        '!public/scripts/modules/sample-module/ts-service.js',
        '!public/scripts/modules/sample-module/uaa-service.js'
    ],
    test: [
        'public/scripts/**/spec/*.js',
        'test/e2e/**/*.js'
    ]
};
