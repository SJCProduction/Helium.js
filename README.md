![alt text](https://i.imgur.com/gPvDcb5.png)
### *<p style="text-align:center">Making your React application lighter! 🎈</p>*

[![npm](https://img.shields.io/npm/v/helium.js.svg)](https://www.npmjs.org/package/helium.js)
[![dependencies](https://david-dm.org/SJCProduction/Helium.js.svg?theme=shields.io)](https://david-dm.org/SJCProduction/Helium.js)
[![NSP Status](https://nodesecurity.io/orgs/heliumjs/projects/36e966e1-6caf-4dd7-b424-bf5eb7c32085/badge)](https://nodesecurity.io/orgs/heliumjs/projects/36e966e1-6caf-4dd7-b424-bf5eb7c32085)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a6b83a7479ee494496ab2b3a30b181c9)](https://www.codacy.com/app/Helium/Helium.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SJCProduction/Helium.js&amp;utm_campaign=Badge_Grade)
[![GitHub stars](https://img.shields.io/github/stars/SJCProduction/Helium.js.svg?style=flat&label=Star)](https://github.com/SJCProduction/Helium.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SJCProduction/Helium.js/blob/master/LISENCE)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/SJCProduction/Helium.js/issues)

## What is Helium.js?
Helium.js is a node package that helps make your React application isomorphic and optimized.

Leveraging server-side rendering can significantly improve first page load performance: render JavaScript templates on the server to deliver fast first render, and then use client-side templating once the page is loaded. However, performance benefits depend on the use case and server-side rendering is not a one size fits all design.

* <b>Currently</b>: 
  * Includes server side rendering with support for React Router v4 and Redux v3 using React Fiber - v16
  * Perfomance metrics CLI
* <b>Coming Soon:</b> Optimization for webpack bundles

## Table of Contents
- [Authors](#authors)
- [Installation](#installation)
  - [Prerequisites](#pre-req)
  - [Locally](#local-installation)
  - [Globally](#global-installation)
- [Usage](#usage)
  - [Client Side](#usage-on-client-side)
    - [with Redux](#usage-on-cl-with-redux)
  - [Server Side](#usage-on-server-side)
    - [CLI](#cli)
    - [DIY](#diy)
      - [with Redux](#usage-on-s-with-redux)
- [Running Your Application](#running)
- [More](#contributing)

## <a name="installation"></a>Installation

### <a name="pre-req"></a>Prerequisites

You will need to have react 16/react-dom and the babel-cli installed as dependencies.

```sh
$ npm install --save react react-dom babel-cli
```

### <a name="local-installation"></a>Local Installation 
```sh
$ npm install --save helium.js
```

### <a name="global-installation"></a>Global Installation
You can **_additionally_** install globally for direct usage of CLI commands in your terminal.
```sh
$ npm install -g --save helium.js
```

## Usage

### <a name="usage-on-client-side"></a>Hydrating on Client Side

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

### <a name="usage-on-cl-with-redux"></a>(with Redux)

```javascript
/* Replace render with helium method
inside the index file of React application */

import helium, { getStore } from 'helium.js/react';

// import your reducer

helium(
  <Provider store={ getStore(reducer) }>
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

// import your reducer
// declare your middlewares

helium(
  <Provider store={ getStore(reducer, middleware) }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, 
  'root' 
);
```
<hr>

### <a name="usage-on-server-side"></a>Rendering on Server Side

#### <a name="cli"></a>Option 1: Automation with CLI
*Have your server file automatically generated by answering questions using our cli.*

**To start up the CLI, do one of the following:**
###### 1. Type this command directly into your terminal
```sh
$ ./node_modules/.bin/he
```
###### 2. Add a script to your package.json and run the script
```json
"scripts": {
  "helium": "he",
},
```
```sh
$ npm run helium
```
###### 3. [Install globally](#global-installation) and run the command normally
```sh
$ he
```


![Image of CLI](https://preview.ibb.co/etMcub/Screen_Shot_2017_12_04_at_12_52_59_AM.png)
---
#### <a name="diy"></a>Option 2: Do it Yourself

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

### <a name="usage-on-s-with-redux"></a>(with Redux)
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

## <a name="running"></a>Running Your Application

If CLI was not used, add a script to your package.json to run your serverfile using babel-node.
```json
"scripts": {
    "start:helium": "babel-node [server file name].js",
},
```

```sh
# To run your application, type the following into your terminal
$ npm run start:helium
```

## <a name="contributing"></a>Contributing

If you would like to contribute, submit a [pull request](https://github.com/SJCProduction/Helium.js/issues) and update the README.md with details of changes.

## <a name="versioning"></a>Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/SJCProduction/Helium.js/tags). 

## <a name="authors"></a>Authors

* [**Shachy Rivas**](https://github.com/shachyjr)
* [**Chris Li**](https://github.com/cli53)
* [**Julie Moon**](https://github.com/juliemoon)

## <a name="license"></a>License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
