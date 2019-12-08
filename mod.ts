interface FunctionWithName extends Function {
  displayName: string;
}

/**
 * Extract names from functions.
 *
 * @param fn The function who's name we need to extract.
 * @returns The name of the function.
 */
export default function name(fn: Function): string {
  if (
    typeof (fn as FunctionWithName).displayName === "string" &&
    fn.constructor.name
  ) {
    return (fn as FunctionWithName).displayName;
  } else if (typeof fn.name === "string" && fn.name) {
    return fn.name;
  }

  //
  // Check to see if the constructor has a name.
  //
  if (
    typeof fn === "object" &&
    (fn as ObjectConstructor).constructor &&
    typeof (fn as ObjectConstructor).constructor.name === "string"
  ) {
    return (fn as ObjectConstructor).constructor.name;
  }

  //
  // toString the given function and attempt to parse it out of it, or determine
  // the class.
  //
  var named = fn.toString(),
    type = Object.prototype.toString.call(fn).slice(8, -1);

  if ("Function" === type) {
    named = named.substring(named.indexOf("(") + 1, named.indexOf(")"));
  } else {
    named = type;
  }

  return named || "anonymous";
}
