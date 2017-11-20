const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3333;

function UserData() {
  const ready = fs.readFileSync('./userInput.json', 'utf8');
  return ready;
}
const parsedData = JSON.parse(UserData());
const inputs = {
  static: parsedData.static, // "./src/client/dist"
  html: parsedData.html, // "./src/client/static/index.html"
  component: parsedData.component, // "./src/client/src/App.jsx"
};
//  User input path for html
const App = require(inputs.component).default;
console.log(App)

// Might need to use absolute path
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
