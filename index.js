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
var utils = require('./lib/utils')
var manageArguments = require('manage-arguments')
var handleArguments = require('handle-arguments')

function Vez (options) {
  if (!(this instanceof Vez)) {
    return new Vez(options)
  }

  Benz.call(this, options)
  this._fns = []
}

util.inherits(Vez, Benz)

Vez.prototype.use = function use () {
  this._fns = utils.compose(this._fns, manageArguments(arguments))
  return this
}

Vez.prototype.series = function series () {
  utils.factory('series', this, arguments)
  return this
}

Vez.prototype.parallel = function parallel () {
  utils.factory('parallel', this, arguments)
  return this
}

Vez.prototype.run = function run () {
  var argz = handleArguments(arguments)
  utils.setContext(this, argz.args)

  if (this.enabled('parallel')) {
    var parallel = this.compose('parallel')
    parallel(this._fns, this.option('extensions'))(argz.callback)
    return
  }
  var series = this.compose('series')
  series(this._fns, this.option('extensions'))(argz.callback)
}

module.exports = Vez
