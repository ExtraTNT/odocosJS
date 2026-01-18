# Contributing to odocosJS

First off, thanks for taking the time to contribute! 
Contributions in the form of bugfixing, testsing and adding functionality (porting haskell) are nice.
Writing documentation and actually tipps on how to use it is also very nice (as it's much harder than implementing things)
Just keep in mind, that this project is so far nothing serious and I currently don't intend (or rather simply can't) to put a lot of time into it.
Because of those limitations on my side, make sure, that your code works, is well documented and fits in.

## Code of Conduct

- We only discriminate people not following the code of conduct.
- Don't take politics into this project, we don't need to talk about how fucked the world is, we don't need to hear how much we would profit, if we ban the use of crossword puzzles in newspapers.
- Don't include malicious code, some is easy to detect, some could just be a small mistake... ... because of this test your code.
- Don't waste time, not your own, not mine

### Legal Notice
When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

## Contributing Code / Docs

If you have something to contribute fork the project, make your changes and open a pull request to develop.

## Contributing Issues / Questions

If you have found a bug or you have a question:
- See if there is already an open issue about it (if so, congrats, you found a solution or where to look further)
- If there is none, open a new issue with a title like "(Question / Bug / Issue) (File) (Function) (What is wrong / My question)" so Bug core.js id returns potato when called with true
- Describe in as much detail as you can, while keeping it reasonable (no need to define natural numbers)

## Styleguides
- functions use one or zero parameter (unless it's needed otherwise which is basically never), so instead of `const f = (x,y) => x+y;` use `const f = x => y => x+y;`
- function names should be clear (use haskell names as a reference)
- the use of var is to be avoided at all cost, let is also to be avoided
- if statements are to be avoided and instead replaced by `const x = y? 0:1;`
- reduce if possible, so `(x => x + 1)(5);` becomse `6;`, `const f = x => g(x);` becomes `const f = g;`
- use `;` and don't reformat documents, in order to keep the history clear

### Commit Messages
- merge will be done in squash, so commits can be messy

### Use of AI
AI tends to fuck things up, it's not recommended to use it.
