import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import name from "./mod.ts";

Deno.test({
  name: "it is exported as a function",
  fn(): void {
    assertEquals(typeof name, "function");
  },
});

Deno.test({
  name: "can extract the name from a function declaration",
  fn(): void {
    function foobar() {}
    assertEquals(name(foobar), "foobar");
  },
});

Deno.test({
  name: "can extract the name from a function expression",
  fn(): void {
    const a = function bar() {};
    assertEquals(name(a), "bar");
  },
});

Deno.test({
  name: "can be overriden using displayName",
  fn(): void {
    const a = function bar() {};
    (a as any).displayName = "bro";
    assertEquals(name(a), "bro");
  },
});

Deno.test({
  name: "works with constructed instances",
  fn(): void {
    interface Bar {}
    function Bar() {}
    const foo: Bar = new (<any> Bar)();
    assertEquals(name(foo as Function), "Bar");
  },
});

Deno.test({
  name: "works with anonymous",
  fn(): void {
    assertEquals(name(function () {}), "anonymous");
  },
});

Deno.test({
  name: "returns the className if we were not given a function",
  fn(): void {
    assertEquals(name(("string" as unknown) as StringConstructor), "String");
  },
});

//
// Test if the env supports async functions, if so add a test to ensure
// that we will work with async functions.
//
let asyncfn = true;
try {
  new Function("return async function hello() {}")();
} catch (e) {
  asyncfn = false;
}

if (asyncfn) {
  Deno.test({
    name: "detects the name of async functions",
    fn(): void {
      const fn = new Function("return async function hello() {}")();
      assertEquals(name(fn), "hello");
    },
  });
}

//
// Test that this env supports generators, if so add a test to ensure that
// we will work with generators.
//
let generators = true;
try {
  new Function("return function* generator() {}")();
} catch (e) {
  generators = false;
}

if (generators) {
  Deno.test({
    name: "detecs the name of a generator",
    fn(): void {
      const fn = new Function("return function* hello() {}")();
      assertEquals(name(fn), "hello");
    },
  });
}
