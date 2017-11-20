const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3333;

const inputs = {
  static: './public',
  html: './index.html',
  component: './src/components/App.js'
};


import App from inputs.component;
import { StaticRouter } from 'react-router-dom';

app.use(express.static(inputs.static));

app.get('*', (req, res) => {
  const context = {};
  let stringComponent = handleRender(App, context, req);
  reroutingHandler(stringComponent, res, context.url, inputs.html);

});

function handleRender (Component, context, req){
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={ req.url } context={ context }>
      <Component />
    </StaticRouter>
  );
  return html;
}

function reroutingHandler(component, res, url, HTMLPath) {
  if (url) {
    res.status = 302;
    res.redirect(url);
    res.end();
  } else {
    fs.readFile(HTMLPath, 'utf8', function (err, data) {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${component}</div>$1</body>`);
      res.write(document);
      res.end();
    });
  }
}

app.listen(PORT, () => {
  console.log(`test-ssr16 app is listening on ${PORT}`)
});
