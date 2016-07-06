'use strict'

var waterfall = require('run-waterfall')
var partial = require('ap').partial
var packageDir = require('get-package-dir')
var browserify = require('browserify')
var uglify = require('uglify-js')
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
  try {
    code = uglify.minify(code.toString(), {fromString: true}).code
    callback(null, code)
  } catch (err) {
    callback(err)
  }
}
