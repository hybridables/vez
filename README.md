# [vez][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Middleware composition at new level. Ultimate alternative to `ware`, `plugins`, `koa-compose` and `composition` packages. Allows you to use callbacks, promises, generators and async/await functions as middlewares.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i vez --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var vez = require('vez')
var assert = require('assert')
var Bluebird = require('bluebird')

vez()
  .use(Bluebird.resolve(123))
  .use(function () {
    assert.deepEqual(this, {a: 'b', c: 'd', e: 'f'})
    return Bluebird.resolve(456)
  })
  .use(function (foo, next) {
    assert.deepEqual(this, {a: 'b', c: 'd', e: 'f'})
    next(null, foo, 789)
  })
  .use(function * (first, second) {
    this.g = first + second
    assert.deepEqual(this, {a: 'b', c: 'd', e: 'f', g: 1245})

    // because generators are handled by `co@4.6`
    return yield {
      gens: this.g
    }
  })
  .run({a: 'b'}, {c: 'd'}, {e: 'f'}, function (err, res) {
    if (err) {
      return console.error(err)
    }
    assert.deepEqual(this, {a: 'b', c: 'd', e: 'f', g: 1245})
    assert.deepEqual(res, [123, 456, [ 456, 789 ], { gens: 1245 }])
    done()
  })
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/vez/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/vez
[npmjs-img]: https://img.shields.io/npm/v/vez.svg?label=vez

[license-url]: https://github.com/tunnckoCore/vez/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/vez
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/vez.svg

[travis-url]: https://travis-ci.org/tunnckoCore/vez
[travis-img]: https://img.shields.io/travis/tunnckoCore/vez.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/vez
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/vez.svg

[david-url]: https://david-dm.org/tunnckoCore/vez
[david-img]: https://img.shields.io/david/tunnckoCore/vez.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
