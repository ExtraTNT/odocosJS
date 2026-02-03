# odocosJS

Playing around with functional JS and calling it odocos (elder)
so that I need to deliver something smart.  
Maybe this lib evolves in something usable, so I try to split it up into modules that can be imported individually.

## Components

 - core.js  : basic implementations for basic things
 - dbg.js   : basic debug util
 - extra.js : additional features
 - httpUtils.js : small HTTP helpers
 - iterator.js  : iterator helpers for list-like structures
 - list.js  : linked list with dynamc generation capabilities and lazy evaluation
 - localObjectStorage.js: storing objects in local storage
 - math.js  : basic mathematical implementations
 - memo.js  : memo functionality to increase performance of pure functions at the cost of ram usage
 - Observable.js : tiny observable wrapper with onChange / getValue / setValue
 - prototypeUtils.js : utils directly on the prototype
 - render.js : minimal virtual-DOM style renderer and vnode helpers
 - scheduler.js : sequential async task scheduler and lazy DataFlowVariable
 - Task.js  : Task monad
 - tree.js : Church-encoded binary tree with Haskell-style type docs

## Why this project is messy

This project is part of some extra points in a basic JS module as part of my CS degree. 

## Contributing

There are guidelines on how to contribut. If you want to do so, pls read them at ./CONTRIBUTING.md