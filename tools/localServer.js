// Local Server
const connect = require('connect');
const fs = require('fs');
const url = require('url');
const path = require('path');

const app = connect();

function LocalServerPlugin(options) {
  this.options = options;
}

LocalServerPlugin.prototype.apply = function () {
  const self = this;
  app.use('/api/', (req, res) => {
    const urlObj = url.parse(req.url, true);
    const cgiPath = path.join(__dirname, '../cgiMock', `${urlObj.pathname}.json`);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const r = fs.createReadStream(cgiPath);

    r.on('error', (err) => {
      res.statusCode = 608;
      res.end(err.toString());
      console.error(err);
    }).pipe(res).on('end', () => {
      res.end();
    });
  }).listen(self.options.port);
};

LocalServerPlugin.apply();
module.exports = LocalServerPlugin;
