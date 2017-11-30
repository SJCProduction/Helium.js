const fs = require('fs');

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
  injectReduxDep,
  replRender,
};
