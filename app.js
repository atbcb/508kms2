const express = require('express');

const app = express();

const clientId = 'd4260bd59aa16c76f837';
const clientSecret = 'b4854333287814781e411502e8f395d564e394dc';

app.get('/', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

app.listen(3000);
console.log('App listening on port 3000');

const axios = require('axios');
let token = null;

app.get('/oauth-callback', (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: 'application/json' } };
  axios.post(`https://github.com/login/oauth/access_token`, body, opts).
    then(res => res.data['access_token']).
    then(_token => {
      console.log('My token:', token);
      token = _token;
      res.json({ ok: 1 });
    }).
    catch(err => res.status(500).json({ message: err.message }));
});