function handleRender (route, context, req){
    let context = {};
    let html = ReactDOMServer.renderToString(
      <StaticRouter location={ req.url } context={ context }>
        <App />
      </StaticRouter>
    );
    return html;
}

// app.get('*', (req, res) => {
//     const context = {};
//     // console.log('url', req.url);
//     let html = ReactDOMServer.renderToString(
//       <StaticRouter location={ req.url } context={ context }>
//         <App />
//       </StaticRouter>
//     );