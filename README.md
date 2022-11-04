## Redux Shopping Cart

Example shopping cart application for learning redux and redux toolkit. Goes along with the egghead course.

## Setup

Checkout the code base and then type:

```
npm install
npm run dev
```

## Technologies

- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## JEST
- to test the only file run `npx jest -- productsSlice`
- to run tests watch type `npx jest --watch`
- to isolate tests over one file press `p` when watch and type filename `cartSlice`
- to start up counting function recomputations first reset them `getMemoizedNumItems.resetRecomputations()`
- to figure out the number of function recomputations call `getMemoizedNumItems.recomputations()`

- to spy on some async request we can use `jest.spyOn` method. Look into `Products.test.tsx` file
- to preview output jsx use `debug` method
- unlike `getAllByRole` ***findByRole*** waits unless it finds it on page

## Features
- To make fetch work with jest, `npm i -D whatwg-fetch`  
  Then in `jest-setup.ts` add  
```javascript
const fetchPolifill = require('whatwg-fetch')

global.fetch = fetchPolifill.fetch
global.Request = fetchPolifill.Request
global.Headers = fetchPolifill.Headers
global.Response = fetchPolifill.Response
```