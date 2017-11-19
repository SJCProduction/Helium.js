import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';


const app = express();
const PORT = process.env.PORT || 3333;

function UserData() {
  const ready = fs.readFileSync('./userInput.json', 'utf8');
  return ready;
}
const parsedData = JSON.parse(UserData());


const inputs = {
  static: parsedData.static,
  html: parsedData.html,
  component: parsedData.component,
};

console.log('user Object ==>', inputs);

app.use(express.static(inputs.static));

function handleRender(Component, context, req) {
  const html = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}>
      <Component />
    </StaticRouter>,);
  return html;
}

function reroutingHandler(component, res, url, HTMLPath) {
  if (url) {
    res.status = 302;
    res.redirect(url);
    res.end();
  } else {
    fs.readFile(HTMLPath, 'utf8', (err, data) => {
      if (err) throw err;
      const document = data.replace(/<body>(.*)<\/body>/, `<body><div id="root">${component}</div>$1</body>`);
      res.write(document);
      res.end();
    });
  }
}

app.get('*', (req, res) => {
  const context = {};
  const stringComponent = handleRender(App, context, req);
  reroutingHandler(stringComponent, res, context.url, inputs.html);
});

app.listen(PORT, () => {
  console.log(`test-ssr16 app is listening on ${PORT}`);
});
