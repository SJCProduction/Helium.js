const getServerScript = userInputs => `
import App from '${userInputs.component}';
const express = require('express');
const helium = require('helium.js');
const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.static('${userInputs.static}'));

helium.init({
  html: '${userInputs.html}',
  id: '${userInputs.id}',
  App,
});

app.get('*', helium.serve);

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;

const getReduxServerScript = userInputs => `
import App from '${userInputs.component}';
import reducer from '${userInputs.reducer}';
const express = require('express');
const helium = require('helium.js');
const PORT = process.env.PORT || 3333;
const app = express();


app.use(express.static('${userInputs.static}'));

helium.init({
  html: '${userInputs.html}',
  id: '${userInputs.id}',
  App,
  reducer,
});

app.get('*', helium.serveRedux);

app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
`;

module.exports = {
  getServerScript,
  getReduxServerScript,
};
