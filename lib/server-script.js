const getServerScript = userInputs => `
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;

ssr.init({
  html: '${userInputs.html}', 
  // component: '${userInputs.component}',
  // sending App on init for temporary fix to expression dependency error
  App: require('${userInputs.component}').default,
});

app.use(express.static('${userInputs.static}'));

app.get('*', ssr.render)

app.listen(PORT, () => {
  \`Server listening on port \${PORT}\`;
});
`;

module.exports = getServerScript;
