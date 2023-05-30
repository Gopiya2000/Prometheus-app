const Prometheus = require('prom-client');
const { route } = require('../routes/index');
const express = require('express');
const prometheusDataCollector = require('../controllers/scrappers/prometheus-data-collector');
const DbService = require('../services/common/db-service');

let callCount = 0;

const app = express();
app.listen(4001)

// Create new instance of prometheus registry to register and manage metrics
const register = new Prometheus.Registry();
register.setDefaultLabels({
    app: "application"
})
Prometheus.collectDefaultMetrics({ register })

route(register, app);

const databaseConnection = new DbService();
databaseConnection.start();

const scrapper = new prometheusDataCollector(register, databaseConnection);
scrapper.scrapeData(callCount)

module.exports = { app }