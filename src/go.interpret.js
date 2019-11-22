"use strict"

const interpret = {}
module.exports = interpret

// To interpret a list of terms, interpret each term and return the list.
interpret.terms = (terms, data, runtime) => {
  return terms.map((term) => { return interpret.term(term, data, runtime) })
}

// To interpret a term, delegate to the type-specific function for that term.
interpret.term = (term, data, runtime) => {
  if (term.type in interpret) {
    return { value: interpret[term.type](term, data, runtime), from: term }
  } else {
    throw new Error("NOT IMPLEMENTED: go.interpret for type: " + term.type)
  }
}

// A text node simply returns the raw text content (a string).
interpret.text = (term, data, runtime) => {
  return term.content
}

// A root node simply returns the root of the data passed in.
interpret.root = (term, data, runtime) => {
  return data
}

// A dot node returns the named member of the data passed in.
interpret.dot = (term, data, runtime) => {
  return interpret.term(term.of, data, runtime).value[term.name]
}
