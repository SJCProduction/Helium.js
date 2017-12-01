const { hydrate, getStore } = require('./clientSide.js');
const { init, serve } = require('./serverSide.js');

console.log("hyd>>>>>>..", hydrate);

module.exports = {
  hydrate,
  getStore,
  init,
  serve,
};

// let preloadedState = {};

// const getStore = () => {
//   console.log(preloadedState);
//   console.log(config.reducer);
//   createStore(config.reducer, preloadedState);
// };

// const init = (inputs) => {
//   console.log('inside init >>>>>>>>>>>>>>>');
//   config.html = inputs.html;
//   config.App = inputs.App;
//   config.reducer = inputs.reducer;

//   config.renderStore = createStore(config.reducer);
//   preloadedState = config.renderStore.getState();
// };

// const serve = (req, res) => {
//   const fs = require('fs');
//   console.log('inside serve >>>>>>>>>>>>>>>');
//   console.log(config);
//   const { App, renderStore } = config;
  
//   const context = {};
//   const stringComponent = ReactDOMServer.renderToString(
//     <Provider store={renderStore}>
//       <StaticRouter location={req.url} context={context}>
//         <App />
//       </StaticRouter>
//     </Provider>
//   );
//   if (context.url) {
//     res.status = 302;
//     res.redirect(context.url);
//   } else {
//     fs.readFile(config.html, 'utf8', (err, data) => {
//       if (err) throw err;
//       const regEx = new RegExp(`<div id="${process.env.ID}"><\/div>`, 'gi');
//       const document = data.replace(regEx, `<div id="${process.env.ID}">${stringComponent}</div>`);
//       res.write(document);
//       res.end();
//     });
//   }
// };

// const hydrate = (e, inputId) => {
//   // process.env.ID = inputId;
//   console.log("iddddddd", inputId);
//   ReactDOM.hydrate(e, document.getElementById(inputId));
// };

// export default hydrate;
// exports = {
//   getStore,
//   init,
//   serve,
// };
