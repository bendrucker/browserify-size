'use strict'

var waterfall = require('run-waterfall')
var partial = require('ap').partial
var packageDir = require('get-package-dir')
var browserify = require('browserify')
var uglify = require('uglify-es')
var gzipSize = require('gzip-size')

module.exports = function browserifySize (name, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  waterfall([
    partial(packageDir, name, options),
    bundle,
    minify,
    gzipSize
  ], callback)
}

function bundle (dir, callback) {
  browserify(dir).bundle(callback)
}

function minify (code, callback) {
  var result = uglify.minify(code.toString())
  callback(result.error, result.code)
}
