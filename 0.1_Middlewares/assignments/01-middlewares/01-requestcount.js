const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable


// this is the assignment code only
// this is the one very  important matric inbackend to make sure your server getting overwelmed thsi its keeep track how many users are hiiting you servers no of req
let requestCountMiddleware = function(req, res, next) {
  requestCount++;
  next();
}
app.use(requestCountMiddleware);
// Done by me


app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function(req, res) {
  res.status(200).json({ requestCount });
});

app.listen(3000);

module.exports = app;