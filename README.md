# Helium.js 
*Making your React application lighter!* 🎈

[![npm](https://img.shields.io/npm/v/helium.js.svg)](https://www.npmjs.org/package/helium.js)
[![Build Status](https://travis-ci.org/SJCProduction/Helium.js.svg?branch=master)](https://travis-ci.org/SJCProduction/Helium.js)
[![dependencies](https://david-dm.org/SJCProduction/Helium.js.svg?theme=shields.io)](https://david-dm.org/SJCProduction/Helium.js)
[![NSP Status](https://nodesecurity.io/orgs/heliumjs/projects/36e966e1-6caf-4dd7-b424-bf5eb7c32085/badge)](https://nodesecurity.io/orgs/heliumjs/projects/36e966e1-6caf-4dd7-b424-bf5eb7c32085)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a6b83a7479ee494496ab2b3a30b181c9)](https://www.codacy.com/app/Helium/Helium.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SJCProduction/Helium.js&amp;utm_campaign=Badge_Grade)
[![GitHub stars](https://img.shields.io/github/stars/SJCProduction/Helium.js.svg?style=flat&label=Star)](https://github.com/SJCProduction/Helium.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SJCProduction/Helium.js/blob/master/LISENCE.md)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/SJCProduction/Helium.js/issues)

Helium.js is a node package that helps make your React application isomorphic and optimized.
* <b>Currently</b>: Includes server side rendering with support for React Router v4 and Redux v3
* <b>Coming Soon:</b> Optimization for webpack bundles

## Prerequisites

You will need to have react/react-dom installed as dependencies.

```sh
$ npm install react react-dom --save
```

## Installation

```sh
$ npm install -g helium.js --save
```

## Usage

### Hydrating on Client Side

```javascript
/* Replace render with helium method
inside the index file of React application */

import helium from 'helium.js/react';

helium(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  'root' 
);
```

### (with Redux)

```javascript
/* Replace render with helium method
inside the index file of React application */

import helium, { getStore } from 'helium.js/react';

helium(
  <Provider store={getStore(reducer)}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, 
  'root' 
);
```

### (with Redux and Middlewares)
```javascript
/* Replace render with helium method
inside the index file of React application.
Declare your middlewares as usual and pass 
in as a second parameter to getStore invocation */

import helium, { getStore } from 'helium.js/react';

// declare your middlewares

helium(
  <Provider store={getStore(reducer, middleware)}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, 
  'root' 
);
```

### Rendering on Server Side

#### <b>Option 1:</b> Automation with CLI
Have your server file automatically generated by answering questions using our cli:

```sh
# To start up the cli, type the following into your terminal:
$ cakeit
```
![Image of CLI](https://preview.ibb.co/etMcub/Screen_Shot_2017_12_04_at_12_52_59_AM.png)
---
#### <b>Option 2:</b> Do it Yourself

```javascript
/* Include this in your server file 
(the file in which you initialize your 
express application) */

// import your root component
import App from './src/components/App.js';
const helium = require('helium.js');

// initialize your express application here

helium.init({
  // indicate the path to your main html file
  html: 'index.html',
  // specify the id to which your React application will be mounted on
  id: 'root',
  App,
});

// input api routes here

app.get('*', helium.serve);

```

### (with Redux)
```javascript
/* Include this in your server file 
(the file in which you initialize your 
express application) */

// import your root component and your reducer
import App from './src/components/App.js';
import reducer from './src/reducers';
const helium = require('helium.js');

// initialize your express application here

helium.init({
  // indicate the path to your main html file
  html: 'index.html',
  // specify the id to which your React application will be mounted on
  id: 'root',
  App,
  reducer,
});

// input api routes here

app.get('*', helium.serveRedux);
```

## Running Your Application

If cli was not used, be sure to add a script to your package.json.
```json
"scripts": {
    "start-helium-server": "./node_modules/.bin/webpack && babel-node HeliumServer.js",
},
```

```sh
# To run your application, type the following into your terminal
$ npm run start-helium-server
```

## Contributing

If you would like to contribute, submit a [pull request](https://github.com/SJCProduction/Helium.js/issues) and update the README.md with details of changes.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/SJCProduction/Helium.js/tags). 

## Authors

* **Shachy Rivas** - [shachyjr](https://github.com/shachyjr)
* **Chris Li** - [cli53](https://github.com/cli53)
* **Julie Moon** - [juliemoon](https://github.com/juliemoon)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
