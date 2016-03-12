'use strict'

var packageDir = require('get-package-dir')
var browserify = require('browserify')
var uglify = require('uglify-js')
var gzipSize = require('gzip-size')

module.exports = function browserifySize (name, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  packageDir(name, options, function (err, dir) {
    if (err) return callback(err)
    bundle(dir, function (err, code) {
      if (err) return callback(err)
      minify(code, function (error, minifiedCode) {
        if (error === null) {
          gzipSize(minifiedCode, callback)
        } else {
          return callback(error)
        }
      })

    })
  })
}

function bundle (dir, callback) {
  browserify(dir).bundle(callback)
}

function minify (code, callback) {
  try {
    var minifiedCode = uglify.minify(code.toString(), {fromString: true}).code
    callback(null, minifiedCode)
  } catch(error) {
    callback(error)
  }
}
