/**
 * Configure copying tasks into dist version
 */
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: [
                    'index.html',                    
                    'config.json',
                    'polymer-loader.vulcanized.html',
                    'images/*',
                    'sample-data/*',
                    'views/**/*',
                    'stylesheets/*',
                    'elements/**/*',
                    
                    '!scripts/modules/sample-module/draggable-tree-nodes.js',
                    '!scripts/modules/sample-module/bars-directive.js',
                    '!scripts/modules/sample-module/mini-tree.js',
                    '!scripts/modules/sample-module/ts-service.js',
                    '!scripts/modules/sample-module/uaa-service.js',

                    'bower_components/webcomponentsjs/webcomponents-lite.js',
                    'bower_components/px/dist/px.min.js',
                    'bower_components/es6-promise/dist/es6-promise.min.js',
                    'bower_components/requirejs/require.js',
                    'bower_components/font-awesome/fonts/*',
                    'bower_components/px-typography-design/type/*',
                    'bower_components/c3/**/*'
                ],
                dest: 'dist/www/'
            }
        ]
    },
    serve: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: ['polymer-loader.html'],
                rename: function (src, dest) {
                    return 'public/polymer-loader.vulcanized.html';
                }
            }
        ]
    }
};
