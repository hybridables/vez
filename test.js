/*!
 * vez <https://github.com/tunnckoCore/vez>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var vez = require('./index')
var Bluebird = require('bluebird')

test('vez:', function (done) {
  vez()
    .use(Bluebird.resolve(123))
    .use(function () {
      test.deepEqual(this, {a: 'b', c: 'd', e: 'f'})
      return Bluebird.resolve(456)
    })
    .use(function (foo, next) {
      test.deepEqual(this, {a: 'b', c: 'd', e: 'f'})
      next(null, foo, 789)
    })
    .use(function * (first, second) {
      this.g = first + second
      test.deepEqual(this, {a: 'b', c: 'd', e: 'f', g: 1245})

      return yield {
        gens: this.g
      }
    })
    .run({a: 'b'}, {c: 'd'}, {e: 'f'}, function (err, res) {
      if (err) {
        return console.error(err)
      }
      test.deepEqual(this, {a: 'b', c: 'd', e: 'f', g: 1245})
      test.deepEqual(res, [123, 456, [ 456, 789 ], { gens: 1245 }])
      done()
    })
})
