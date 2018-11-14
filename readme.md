# browserify-size [![Build Status](https://travis-ci.org/bendrucker/browserify-size.svg?branch=master)](https://travis-ci.org/bendrucker/browserify-size) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/browserify-size.svg)](https://greenkeeper.io/)

> Get the browserified size of a module after minification and gzipping


## Install

```
$ npm install --save browserify-size
```

For the CLI:

```
$ npm install --global browserify-size
```


## Usage

API

```js
var browserifySize = require('browserify-size')

browserifySize('xtend', callback)
//=> callback(null, 366)
```

CLI

```sh
# arg
$ browserify-size xtend
# stdin
$ echo xtend | browserify-size
#=> 366 B
```

## API

#### `browserifySize(name, [options], callback)` -> `undefined`

##### name

*Required*  
Type: `string`

The package name or a path to a local package.

##### options

###### version

Type: `string`  
Default: `''`

The package version to use. Only applies when downloading from npm.

###### cwd

Type: `string`  
Default: `process.cwd()`

##### callback

*Required*  
Type: `function`  
Arguments: `err, bytes`

A callback to be called with the number of bytes in the resulting bundle after minification and gzipping.


## License

MIT © [Ben Drucker](http://bendrucker.me)
