#!/usr/bin/env node

'use strict'

var size = require('./')
var meow = require('meow')
var fail = require('cli-fail')
var prettyBytes = require('pretty-bytes')
var stdin = require('get-stdin')

var cli = meow({
  help: [
    'Usage',
    '  browserify-size <package|path>'
  ]
})

var name = cli.input[0]

if (name) return init(name)
stdin(init)

function init (name) {
  if (!name) fail('Package name or path is required')
  size(name, function (err, bytes) {
    if (err) return fail(err)
    console.log(prettyBytes(bytes))
  })
}
