type Dependency = {
  // DISCLOSURE: I'm not a fan of 'any' here, but I ran uot of time trying to find a type def that
  //             allowed me to use 'new dependency()'.
  dependency: any;
  params: Array<string>;
}

type Registered = Map<string, Dependency>

class Container {
  _registered: Registered;

  constructor() {
    this._registered = new Map()
  }

  register = (name, dependency, params = []) => {
    if (!this._isSupported(dependency)) {
      throw Error(`Unsupported dependency type for "${name}".`)
    }

    if (this._isRegistered(name)) {
      throw Error(`A dependency with the name "${name}" is already registered.`)
    }

    this._registered.set(name, { dependency, params })
  }

  get = dep => {
    const depDetails = this._registered.get(dep)

    if (!depDetails) {
      throw Error(`No such dependency: "${dep}"`)
    }

    const { dependency, params } = depDetails
    const contructorParams = params.map(param => {
      if (this._isRegistered(param)) {
        // This is a dependency that was registered previously, so resolve and return.
        return this.get(param)
      }

      // This is a literal parameter, so return it as-is.
      return param
    })

    return this._isClass(dependency)
      ? new dependency(...contructorParams)
      : dependency
  }

  _isSupported = dependency => typeof dependency === 'function'

  _isClass = dependency => typeof dependency.prototype === 'object'

  _isRegistered = name => this._registered.get(name) !== undefined
}

export default Container
