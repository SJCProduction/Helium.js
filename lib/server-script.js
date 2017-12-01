const getReduxServerScript = userInputs => `
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;

ssr.init({
  html: '${userInputs.html}',
  App: require('${userInputs.component}').default,
  id: '${userInputs.id}',
  reducer: require('${userInputs.reducer}').default,
});

app.use(express.static('${userInputs.static}'));

app.get('*', ssr.renderRedux);

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;

const getServerScript = userInputs => `
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;

ssr.init({
  html: '${userInputs.html}',
  App: require('${userInputs.component}').default,
  id: '${userInputs.id}',
});

app.use(express.static('${userInputs.static}'));

app.get('*', ssr.render);

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;

module.exports = {
  getServerScript,
  getReduxServerScript,
};
