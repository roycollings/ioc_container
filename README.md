# Approach
This is the first time I've attempted an IOC library, so a bit of 'playing' was required first to see where I'd go. My approach therefore was:

1. 'scribble': tried out a few concepts and ideas to see what I liked / what was feasible in the timescales.
2. Once I knew _how_ to do what I wanted, write the simplest solution following TDD principles (red -> green -> refactor).

To clarify the implementation, I've added a `demo.ts` file, which can be run with:
```
yarn demo
```

##  Testing
Unit tests can be run with:
```
yarn test
```

# Choices
- I _could_ have used 'decorators' but chose not to: they're very cool and give a much nicer user experience, but they rely 100% on an 'experimental' feature of typescript. This means there's a possibility it'll not be available in the future. If that happens, we'd be blocked on upgrading to newer versions of Typescript by a (possibly) large and expensive refactor. _Not_ using decorators means we never _have_ to refactor, but the choice is there if they become a standard part of Typescript.

- I also considered registering dependencies with a JSON file. This had the advantage of giving devs 'intellisense' (you can import the JSON and use the keys instead of strings), which means zero chance of a typo causing problems. The downside to that, is we'd need to track the physical location of every dependency in the JSON, which gives us another overhead if we need to refactor.
