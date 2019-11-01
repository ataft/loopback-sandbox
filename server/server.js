// Copyright IBM Corp. 2015,2019. All Rights Reserved.
// Node module: loopback-sandbox

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }

    var whereClause = {
      where: {
        or: [
          {email: 'someone@gmail.com'},
          {username: 'someone'},
        ],
      },
    };
    app.models.User.findOne(whereClause, function (err, user) {
      console.log('err: ', err);
      console.log('user: ', user);
    });

  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
