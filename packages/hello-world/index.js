const functions = require('@google-cloud/functions-framework');

functions.http('helloGET', (req, res) => {
  res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
});
