/*!
 * vez <https://github.com/tunnckoCore/vez>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var util = require('util')
var Benz = require('benz')
var extend = require('extend-shallow')
var isObject = require('is-extendable')
var manageArguments = require('manage-arguments')
var handleArguments = require('handle-arguments')
var is = require('is-kindof')

module.exports = Vez

function Vez (options) {
  if (!(this instanceof Vez)) {
    return new Vez(options)
  }

  Benz.call(this, options)
  this._fns = []
}

util.inherits(Vez, Benz)

Vez.prototype.use = function use () {
  this._fns = compose(this._fns, manageArguments(arguments))
  return this
}

Vez.prototype.series = function series () {
  factory('series', this, arguments)
  return this
}

Vez.prototype.parallel = function parallel () {
  factory('parallel', this, arguments)
  return this
}

Vez.prototype.run = function run () {
  var argz = handleArguments(arguments)
  setContext(this, argz.args)

  if (this.enabled('parallel')) {
    var parallel = this.compose('parallel')
    parallel(this._fns, this.option('extensions'))(argz.callback)
    return
  }
  var series = this.compose('series')
  series(this._fns, this.option('extensions'))(argz.callback)
}

function factory (method, self, argsObject) {
  var argz = handleArguments(argsObject)
  setContext(this, argz.args)

  var flow = self.compose(method)
  var done = flow(self._fns, self.option('extensions'))
  done(argz.callback)
}

function setContext (self, args) {
  var contexts = args.filter(isObject)
  var ctx = extend.apply(null, [self.option('context')].concat(contexts))
  self.option('context', ctx)
}

function compose (fns, middlewares) {
  var len = middlewares.length
  var i = 0

  while (i < len) {
    var mw = middlewares[i++]
    if (!allowedMiddleware(mw)) continue
    fns.push(mw)
  }

  return fns
}

function allowedMiddleware (mw) {
  return is(mw, 'promise') || is(mw, 'generatorfunction') || is(mw, 'function')
}
