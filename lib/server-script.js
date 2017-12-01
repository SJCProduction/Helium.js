const getReduxServerScript = userInputs => `
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static('${userInputs.static}'));

ssr.init({
  html: '${userInputs.html}',
  id: '${userInputs.id}',
  App: require('${userInputs.component}').default,
  reducer: require('${userInputs.reducer}').default,
});

app.get('*', ssr.serveRedux);

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;

const getServerScript = userInputs => `
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static('${userInputs.static}'));

ssr.init({
  html: '${userInputs.html}',
  App: require('${userInputs.component}').default,
  id: '${userInputs.id}',
});

app.get('*', ssr.serve);

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;

module.exports = {
  getServerScript,
  getReduxServerScript,
};
