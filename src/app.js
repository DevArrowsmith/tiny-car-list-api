const express = require('express');
const listingControllers = require('./controllers/listing');

const app = express();
app.use(express.json());

app.post('/listing', listingControllers.create);

app.get('/listing', listingControllers.get);

app.patch('/listing/:listingId', listingControllers.update);

app.delete('/listing/:listingId', listingControllers.delete);

module.exports = app;
