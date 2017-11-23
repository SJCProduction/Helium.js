const sampleServer = `
const express = require('express');
const ssr = require('sjc');
const app = express();
const PORT = process.env.PORT || 3333;


const inputs = ssr.userData()
// importing App for temporary fix to expression dependency error

ssr.init({
  html: inputs.html, 
  // component: inputs.component,
  // sending App on init for temporary fix to expression dependency error
  App: require(inputs.component).default,
});

app.use(express.static(inputs.static));

app.get('*', ssr.render)

app.listen(PORT, () => {
  \`Server listening on port \${PORT}\`;
});
`;

module.exports = sampleServer;
