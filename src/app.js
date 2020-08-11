const express = require('express');
const listingControllers = require('./controllers/listing');

const app = express();
app.use(express.json());

app.post('/listing', listingControllers.create);

module.exports = app;
