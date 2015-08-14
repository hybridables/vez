/*!
 * vez <https://github.com/tunnckoCore/vez>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var is = require('is-kindof')
var merge = require('merge-deep')
var isObject = require('is-extendable')
var handleArguments = require('handle-arguments')

exports.factory = function factory (method, self, argsObject) {
  var argz = handleArguments(argsObject)
  exports.setContext(this, argz.args)

  var flow = self.compose(method)
  var done = flow(self._fns, self.option('extensions'))
  done(argz.callback)
}

exports.setContext = function setContext (self, args) {
  var contexts = args.filter(isObject)
  var ctx = merge.apply(null, [{}, self.option('context')].concat(contexts))
  self.option('context', ctx)
}

exports.compose = function compose (fns, middlewares) {
  var len = middlewares.length
  var i = 0

  while (i < len) {
    var mw = middlewares[i++]
    if (!exports.allowedMiddleware(mw)) continue
    fns.push(mw)
  }

  return fns
}

exports.allowedMiddleware = function allowedMiddleware (mw) {
  return is(mw, 'promise') || is(mw, 'generatorfunction') || is(mw, 'function')
}
