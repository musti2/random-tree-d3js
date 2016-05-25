module.exports = {
    target: {
        files: {
            "public/stylesheets/main.min.css": [
                //'public/stylesheets/app.css',
                '!public/stylesheets/main.min.css',
                '!public/stylesheets/cd-side-nav.css',
                '!public/stylesheets/list.css',
                '!public/stylesheets/bars.css',
                'public/stylesheets/*.css',
                'public/stylesheets/**/*.css',
                'public/bower_components/c3/c3.min.css'
            ]
        },
        livereload: true
    }
}
