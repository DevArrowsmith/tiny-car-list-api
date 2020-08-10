const express = require('express');

// const routerA = require('./routes/routeA');

const app = express();

app.use(express.json());

module.exports = app;
