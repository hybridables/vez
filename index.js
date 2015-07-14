/*!
 * vez <https://github.com/tunnckoCore/vez>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var util = require('util')
var Benz = require('benz')
var extend = require('extend-shallow')
var isObject = require('is-extendable')
var handleArguments = require('handle-arguments')

module.exports = Vez

function Vez (options) {
  if (!(this instanceof Vez)) {
    return new Vez(options)
  }

  Benz.call(this, options)
  this.stack = []
}

util.inherits(Vez, Benz)

Vez.prototype.use = function (fn) {
  this.stack.push(fn)
  return this
}

Vez.prototype.series = function series () {
  var argz = handleArguments(arguments)
  setContext(this, argz.args)

  var series = this.compose('series')
  var done = series(this.stack, this.option('extensions'))
  return done(argz.callback)
}

Vez.prototype.parallel = function parallel () {
  var argz = handleArguments(arguments)
  setContext(this, argz.args)

  var parallel = this.compose('parallel')
  var done = parallel(this.stack, this.option('extensions'))
  return done(argz.callback)
}

Vez.prototype.run = function run () {
  var argz = handleArguments(arguments)
  setContext(this, argz.args)

  if (this.enabled('parallel')) {
    var parallel = this.compose('parallel')
    return parallel(this.stack, this.option('extensions'))(argz.callback)
  }
  var series = this.compose('series')
  return series(this.stack, this.option('extensions'))(argz.callback)
}

/**
 * utils
 */

function setContext (self, args) {
  var contexts = args.filter(isObject)
  var ctx = extend.apply(null, [self.option('context')].concat(contexts))
  self.option('context', ctx)
}
