# odocosJS

Playing around with functional JS and calling it odocos (elder)
so that I need to deliver something smart.  
Maybe this lib evolves in something usable, so I try to split it up into modules that can be imported individually.

## Components

- core.js  : basic implementations for basic things
- dbg.js   : basic debug util
- extra.js : additional features
- list.js  : linked list with dynamc generation capabilities and lazy evaluation
- math.js  : basic mathematical implementations
- memo.js  : memo functionality to increase performance of pure functions at the cost of ram usage
- prototypeUtils.js : utils directly on the prototype
- Task.js  : Task monad
 - httpUtils.js : small HTTP helpers (e.g. mapToQuery)
 - iterator.js  : iterator helpers for list-like structures
 - Observable.js : tiny observable wrapper with onChange / getValue / setValue
 - render.js : minimal virtual-DOM style renderer and vnode helpers
 - scheduler.js : sequential async task scheduler and lazy DataFlowVariable
 - tree.js : Church-encoded binary tree with Haskell-style type docs

## Why this project is messy

This project is part of some extra points in a basic JS module as part of my CS degree. 

