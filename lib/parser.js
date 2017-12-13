/*
  Copyright (c) 2017 Shachy Rivas @shachyjr, Chris Li @cli53, Julie Moon @juliemoon
  Licensed under the MIT License http://www.opensource.org/licenses/mit-license.php
*/

const fs = require('fs');

const getAppPath = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    const start = data.indexOf('hydrate');
    const end = data.indexOf(',', start);
    const inside = data.slice(start + 8, end);
    const components = inside.match(/<(.*?)>/gi);
    const ind = Math.floor(components.length / 2);
    const name = components[ind].replace(/</, '').replace(/\//, '').replace(/>/, '');
    const regEx = new RegExp(`import(.*?)${name}(.*?)'(.*?)'`);
    const filePath = data.match(regEx)[3];
    return filePath;
  });
};


const injectReduxDep = (path) => {
  const data = fs.readFileSync(path, 'utf8');

  let modified = `import { createStore } from 'redux';\nconst preloadedState = window.__PRELOADED_STATE__;\ndelete window.__PRELOADED_STATE__\nconst storeFromSJCPackage = createStore(counterApp, preloadedState)\n\n${data}`;

  modified = modified.replace(/store=(.*)}/, 'store={storeFromSJCPackage}');

  fs.writeFileSync(path, modified);
};

const replRender = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const modified = data.replace(/render/gi, 'hydrate');
  fs.writeFileSync(path, modified);
};

module.exports = {
  getAppPath,
  injectReduxDep,
  replRender,
};
