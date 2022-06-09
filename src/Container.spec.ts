import Container from './Container'

it("can inject functions", () => {
  const container = new Container()

  const functionDependency = text => `Test: "${text}"`
  container.register('myFunc', functionDependency)

  class A {
    _injectedItem: any
    constructor(item: any) {
      this._injectedItem = item
    }

    printIt(text: string) {
      return this._injectedItem(text)
    }
  }

  const instance = new A(container.get("myFunc"))
  const result = instance.printIt("hello");

  expect(result).toBe('Test: "hello"')
})

it("can inject classes", () => {
  const container = new Container()

  class ClassDependency {
    printIt = text => `Test: "${text}"`
  }
  container.register('myClass', ClassDependency)

  class A {
    _injectedItem: any
    constructor(item: any) {
      this._injectedItem = item
    }

    printIt(text: string) {
      return this._injectedItem.printIt(text)
    }
  }

  const instance = new A(container.get("myClass"))
  const result = instance.printIt("hello");

  expect(result).toBe('Test: "hello"')
})

it("can inject classes with constructor params", () => {
  const container = new Container()

  class ClassDependency {
    _text: string;
    constructor(text: string) {
      this._text = text
    }

    printIt = () => `Test: "${this._text}"`
  }
  container.register('myClass', ClassDependency, ['hello'])

  class A {
    _injectedItem: any
    constructor(item: any) {
      this._injectedItem = item
    }

    printIt() {
      return this._injectedItem.printIt()
    }
  }

  const instance = new A(container.get("myClass"))
  const result = instance.printIt();

  expect(result).toBe('Test: "hello"')
})

it("can inject classes with registered params", () => {
  const container = new Container()

  const functionDependency = text => `Test: "${text}"`
  container.register('myFunc', functionDependency)

  class ClassDependency {
    _printFunc: Function
    constructor(printFunc: Function) {
      this._printFunc = printFunc
    }

    printIt = text => this._printFunc(text)
  }
  container.register('myClass', ClassDependency, ['myFunc'])

  class A {
    _injectedItem: any
    constructor(item: any) {
      this._injectedItem = item
    }

    printIt(text: string) {
      return this._injectedItem.printIt(text)
    }
  }

  const instance = new A(container.get("myClass"))
  const result = instance.printIt("hello");

  expect(result).toBe('Test: "hello"')
})

it("will not allow the same dependency to be regstered twice", () => {
  const container = new Container()

  const functionDependency = text => `Test: "${text}"`
  container.register('myFunc', functionDependency)

  expect(() => container.register('myFunc', functionDependency))
    .toThrow('A dependency with the name "myFunc" is already registered.');
})

it("will not allow unsupported dependencies", () => {
  const container = new Container()

  const arrayDependency = [1, 2, 3, 4]

  expect(() => container.register('myArray', arrayDependency))
    .toThrow('Unsupported dependency type for "myArray".');
})

it("will not throw if dependency not registered", () => {
  const container = new Container()

  const functionDependency = text => `Test: "${text}"`
  container.register('myFunc', functionDependency)

  expect(() => container.get('no-such-dependency'))
    .toThrow('No such dependency: "no-such-dependency"');
})
