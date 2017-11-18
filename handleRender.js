function handleRender (Component, context, req){
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={ req.url } context={ context }>
      <Component />
    </StaticRouter>
  );
  return html;
}