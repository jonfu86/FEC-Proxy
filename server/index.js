const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 9999;

const featureExplorerProxy = createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  logLevel: 'debug',
});

const relatedProductsProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  logLevel: 'debug',
});
// app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

app.use('/products/', relatedProductsProxy);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
