const express = require('express');
const cors = require('cors');
const listingControllers = require('./controllers/listing');
const adminCode = require('./middleware/admin-code');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/listing', adminCode, listingControllers.create);

app.get('/listing', listingControllers.get);

app.patch('/listing/:listingId', adminCode, listingControllers.update);

app.delete('/listing/:listingId', adminCode, listingControllers.delete);

module.exports = app;
