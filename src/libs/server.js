const Prometheus = require('prom-client');
const { route } = require('../routes/index');
const express = require('express');
const prometheusDataCollector = require('../controllers/scrappers/prometheus-data-collector');

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

const scrapper = new prometheusDataCollector(callCount, register);
scrapper.scrapeData()

module.exports = { app }