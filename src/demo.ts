/*
 A demo of how to implement and use the IOC container in different scenarios.
 Execute with:

    yarn demo

 */
import Container from './Container'

const printFunction = text => console.log(`Simple function: "${text}"`)

class SimpleClass {
  printIt = text => console.log(`Simple class: "${text}"`)
}

class ClassWithConstructorParam {
  _text: string;
  constructor(text) {
    this._text = text
  }

  printIt = () => console.log(`Class with constructor parameter: "${this._text}"`)
}
class ClassWithRegisteredConstructorParam {
  _printFunc: Function
  constructor(printFunc) {
    this._printFunc = printFunc
  }

  printIt = text => console.log(`Class with registered constructor parameter: ${this._printFunc(text)}"`)
}

const container = new Container()
container.register('printFunction', printFunction)
container.register('simple', SimpleClass)
container.register('complex1', ClassWithConstructorParam, ['Hellooo'])
container.register('complex2', ClassWithRegisteredConstructorParam, ['printFunction'])

class A {
  _printIt: any
  _simple: any
  _complex1: any
  _complex2: any

  constructor(printIt, simple, complex1, complex2) {
    this._printIt = printIt
    this._simple = simple
    this._complex1 = complex1
    this._complex2 = complex2
  }

  printIt(input) {
    this._printIt(input)
  }

  simplePrintIt(input) {
    this._simple.printIt(input)
  }

  complex1PrintIt() {
    this._complex1.printIt()
  }

  complex2PrintIt(input) {
    this._complex2.printIt(input)
  }
}

const a = new A(
  container.get('printFunction'),
  container.get('simple'),
  container.get('complex1'),
  container.get('complex2')
)

a.printIt('hello')
a.simplePrintIt('hello')
a.complex1PrintIt()
a.complex2PrintIt('hello')
