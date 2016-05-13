const fs = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
 wiredep = require('wiredep').stream;

var index = './src/client/index.html',
  options = {
    // Had to comment since I don't know what `config` is
    // exclude    : config.bower.exclude,

    fileTypes: {
      html: {
        replace: {
          js: function(filePath) {
            var fileIsMinified = filePath.indexOf('.min.js') > -1

            if (!fileIsMinified) {
              var possibleMinFilePath = filePath.replace('.js', '.min.js')

              if (fs.existsSync(possibleMinFilePath)) {
               filePath = possibleMinFilePath
              }
            }

            return '<script src="' + filePath.replace('../..', '') + '"></script>'
          }
        }
      }
    }
  };


gulp.task('wiredep', () => {
  return gulp
    .src(index)
    .pipe(wiredep(options))
    .pipe(gulp.dest('./src/client/'));
});