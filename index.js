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
      code = minify(code)
      gzipSize(code, callback)
    })
  })
}

function bundle (dir, callback) {
  browserify(dir).bundle(callback)
}

function minify (code) {
  return uglify.minify(code.toString(), {fromString: true}).code
}
