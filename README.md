# fn-name

[![tag](https://img.shields.io/github/release/denomod/fn-name)](https://github.com/denomod/fn-name/releases)
[![Build Status](https://github.com/denomod/fn-name/workflows/ci/badge.svg?branch=master)](https://github.com/denomod/fn-name/actions)
[![license](https://img.shields.io/github/license/denomod/fn-name)](https://github.com/denomod/fn-name/blob/master/LICENSE)
[![](https://img.shields.io/badge/deno-v0.26.0-green.svg)](https://github.com/denoland/deno)

Extract the name from a function.

## Usage

```js
import name from "https://deno.land/x/fn_name/mod.ts";

console.log(name(function foo() {})); // foo
console.log(name(function() {})); // anonymous
```

## API

### name(fn: Function): string

Type: `Function`

Extract names from functions.

### License

[fn-name](https://github.com/denomod/fn-name) is released under the MIT License. See the bundled [LICENSE](./LICENSE) file for details.

## Thanks

Heavily inspired by [sindresorhus/slashh](https://github.com/sindresorhus/slash).
