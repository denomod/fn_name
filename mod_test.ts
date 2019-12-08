import { test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import name from "./mod.ts";

test({
  name: "it is exported as a function",
  fn(): void {
    assertEquals(typeof name, "function");
  }
});

test({
  name: "can extract the name from a function declaration",
  fn(): void {
    function foobar() {}
    assertEquals(name(foobar), "foobar");
  }
});

test({
  name: "can extract the name from a function expression",
  fn(): void {
    const a = function bar() {};
    assertEquals(name(a), "bar");
  }
});

test({
  name: "can be overriden using displayName",
  fn(): void {
    const a = function bar() {};
    (a as any).displayName = "bro";
    assertEquals(name(a), "bro");
  }
});

test({
  name: "works with constructed instances",
  fn(): void {
    function Bar() {}
    const foo = new Bar();
    assertEquals(name(foo), "Bar");
  }
});

test({
  name: "works with anonymous",
  fn(): void {
    assertEquals(name(function() {}), "anonymous");
  }
});

test({
  name: "returns the className if we were not given a function",
  fn(): void {
    assertEquals(name(("string" as unknown) as StringConstructor), "String");
  }
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
  test({
    name: "detects the name of async functions",
    fn(): void {
      const fn = new Function("return async function hello() {}")();
      assertEquals(name(fn), "hello");
    }
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
  test({
    name: "detecs the name of a generator",
    fn(): void {
      const fn = new Function("return function* hello() {}")();
      assertEquals(name(fn), "hello");
    }
  });
}
