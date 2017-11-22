# Contributing to Criticide
:balloon: _Contributing is fulfilling and does make an impact._:tada:

>There exist invariant self-evidently true principals which constraint all software development efforts.
Any process that does not work against these principals can move the ball forward.
Only a team that shares practices that leverage the principals delivers outcomes.

## Contents
Part 1, 2 and 3 are essential reading for contributing, together they answer
what the application is, how to contribute and where in the code base
specific parts of the implementation are located.

The later parts provide definitions and explanations of the foundations
that unpin the day to day tactical actions. It is worth these before
making a pull request that changes the meaning part 1, 2 or three.

### 1. Application Purpose
Time, energy and effort expenditure in any software development activity is considerable.
There needs to exist arguable bases for a payoff that far exceeds
(100 Times) any expectation of cost, factoring in the human tendency to
over inflate the payoff and under estimate the cost magnitudes.

- [Value Statement](#value-statement)

- [Use Case Boundary](#use-case-boundary)

### 2. Practice Area
The cognitive weight of a code base slows implementation and contribution.
The tactical actions in the following areas aim to avoid accidental complexity
while unpacking the essential complexity, the application requires.

- [Work Unit Sizing](work-unit-sizing)

- [Design & Code Idioms](design-&-code_idioms)

- [Commit Build Review](commit-build-review)

- [Release & Monitor](release-&-monitor)

### 3. Implementation Specifics
A definitive map of the components, elements and structures along with an
explanation of the implementation decisions which are not immediately self-evident.

- [User Interface Decomposition](user-interface-decomposition)

- [Architectural Decision History](architectural-decision-history)

- [Code Structure](code-structure)

### 4. Invariant Development Constraints
Beyond differences in individual abilities and experience there are
self-evident constraints which limit every software development effort.
Captured in a series of axioms these give rise to practices and process
which can be applied to deliver tangible outcomes.

- [Cognitive Load Barrier](#cognitive-load-barrier)

- [Heuristics & Biases Propensity](#heuristics-&-biases-propensity)

- [Defaults to Misunderstanding](#defaults-to-misunderstanding)

### 5. Reference Materials & Guides
Not forgetting the nickle and dime issues that can easily cost a few hours here and there, this
section contains guide on how to do the simple stuff that is just needed
to get the show on the road.

- [Development Environment Setup](#development-environment-setup)
- [Testing](#testing)
- [Developer Documentation](#Developer-Documentation)

---

#### Value Statement

#### Use Case Boundary

#### Work Unit Sizing
>How big or small should a task be? When should it be broken up into individual parts?
Should the individual parts stand alone? Does it even matter,
surely it depends on what the contributor?

#### Design & Code Idioms
> Why is this imported separately? Can't we just inline this? It was available,
so I just used it.  It is just a string that needs to be formatted?
Is it not cleaner that I break it all out to different files?

#### Commit Build Review
>Do I branch or folk? When and what should commit? What needs to be in the pull request.
Is the PR stale? Is it going to be rejected? Should I reject it?

#### Release & Monitor

#### User Interface Decomposition

#### Architectural Decision History

#### Code Structure
>Where do I find? How do I run test and turn up the app locally?

##### `/test` directory
Houses all test for the application, grouped into four areas:

`../guiDriver`

Test that use [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/) and [WebdriverIO](http://webdriver.io/)
to simulate user interaction with the application. All these test depend upon the availability of a packaged version of the
application being available at `out/Criticide-darwin-x64/Criticide.app/Contents/MacOS/Criticide`. A packaged version can be
created via `npm run package`.

`../stubs`

Self explanatory, as we used [auto mocks](https://facebook.github.io/jest/docs/en/mock-function-api.html#content) in [JEST](https://github.com/facebook/jest) there are no explicit directory of mock files.
mock functions live in the actual test.

`../unit`

Standalone unit test live here.

`../integration`

Integration or cross cutting test live here.

#### Cognitive Load Barrier

#### Heuristics & Biases Propensity

#### Defaults to Misunderstanding

#### Development Environment Setup
> Ideally a project is arranged that regardless of the tools a developer should be able
to deliver a result with a simple text editor.

Initially Atom, Intellij and WebStorm have been considered in the following documentation.
The approach has been to place as many of the development dependencies as reasonable into
the `config.json` file within the **devDependencies** section. Hence when the based
development environment is ready running `npm install` from the CLI is all that is required.

###### Assumptions
The following assumptions have been made:

1. The environment has [Nodejs](https://nodejs.org/en/download/current/) (Version 8.2.1) installed.
2. The package manager [NPM](https://www.npmjs.com/) (Version 5.2.0) **NOT 5.3.0** which is standard with (node 8.2.1) is installed.

If all is well `npm doctor` in the CLI should produce something similar to the following:

```
Check                               Value                        Recommendation
npm ping                            OK
npm -v                              v5.2.0                       Use npm v5.3.0
node -v                             v8.2.1
npm config get registry             https://registry.npmjs.org/
which git                           /usr/local/bin/git
Perms check on cached files         ok
Perms check on global node_modules  ok
Perms check on local node_modules   ok
Verify cache contents               verified 2783 tarballs


```

3. That [electron forge](https://electronforge.io/) is installed globally.

If all is well `electron-forge -V` in the CLI should produce the following:

```
✔ Checking your system
3.0.5
```

4. That [Atom](https://atom.io/), or [Intellij](https://www.jetbrains.com/idea/) or [WebStorm](https://www.jetbrains.com/webstorm/) is installed.

###### Acid Test
Before moving onto the IDE let ensure the core environment is running correctly.

From the CLI with the `pwd` (present working directory) set yo where you have your project cloned into executed the following test:

Before: `npm install` will bring in all the dependencies. When this completes do the following two test.

1. `npm run start`, should start up an development instance of the application.
2. `npm run make`, should create an /out/ directory with a zip file. Once unzipped there should be an executable of the application.

Should the above two quick test work, we should some confidence that your environment has all the correct major elements in place.

###### ATOM Setup
This is actually fair simple.

1. Install the [sync-settings](https://atom.io/packages/sync-settings) package.
2. Use the gist at https://gist.github.com/rayk/55bcf75883ab5f210fe0a42a59e704fa to get a copy of the settings.

_That is it your done._

The sightly more complex way it is manually install the packages you want. There is a list of them [here](https://gist.github.com/rayk/55bcf75883ab5f210fe0a42a59e704fa#file-packages-json).

[ :point_left: [main](https://github.com/rayk/criticide) | :point_up: [top](#contributing-to-criticide) ]

###### IntelliJ & WebStorm
Much of the editor set will be done automatically for you via the `.editorconfig` in the project root. Additionally you will need to ensure.

1. Enable that Node is actually enabled.

![Enable Node](https://github.com/rayk/criticide/blob/30-Skeleton/doc/nodeNPM%20enabled.png)

2. The project does not use typescript, yet [installing](https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/) DefinitelyTyped [definitions](https://github.com/DefinitelyTyped/DefinitelyTyped) for project dependencies improves auto completions and helps avoid fat fingers errors.

![Type Definations](https://github.com/rayk/criticide/blob/30-Skeleton/doc/typeLibraries.png)

_That is it your done._

[ :point_left: [main](https://github.com/rayk/criticide) | :point_up: [top](#contributing-to-criticide) ]

##### Testing

Forget the holy wars, the jury is back, and Testing is GOOD!
If it is not working for you, then you are probably doing it wrong. So here is the loading down.

The test serves two purposes and depending on the purpose you do it differently.
First design and secondary verification. Design test sometimes called outside in, or behavioural test,
facilitate the discovery of what something, be it a component, etc.  works.
Design test tends to focus on the simplicity of the positive case.
It should show how the user in the UI would affect the application. For a library,
function or another interface a developer would interact with the focus is on calling signature and the return.
There really should not be too much concern about the implementation behind the interface.

###### Design Test
A Design test is all about getting your understand and intent clear;
everything else can take a back seat for the moment.

Take for example the [application context](appCtx.js).
It exists simply to provide other functions information about the runtime environment.
So the ergonomics of using the context is that it should structure that it support auto-completion,
hence you can easily find the variable you need.
Probably would also be cool to see what depends upon a variable in the context.

###### Verification Test
A verification test (not to be confused with [software verification](https://en.wikipedia.org/wiki/Software_verification_and_validation#Software_verification) in the CMMI)
it about the checking that implementation approach is sound.
These type of test tend to be more structured and deals more extensively with permutations and edge cases.

[ :point_left: [main](https://github.com/rayk/criticide) | :point_up: [top](#contributing-to-criticide) ]

##### Developer Documentation
There is nothing wrong with developer documentation, until you get too much of it.

`npm run devDoc`

Generates developer documentation over the Criticide code base. Noticed that only the major interfaces are documented in each module.
There should be zero documentation on how the code does what it does, after all that is purpose of the code. Rather the focus is on
documenting the stable interfaces of the application.

[ :point_left: [main](https://github.com/rayk/criticide) | :point_up: [top](#contributing-to-criticide) ]
