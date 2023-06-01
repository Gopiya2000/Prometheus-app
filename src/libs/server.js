const Prometheus = require('prom-client');
const { route } = require('../routes/index');
const express = require('express');
const prometheusDataCollector = require('../controllers/scrapers/prometheus-data-collector');
const { fiveMinutesInMilliseconds } = require('../constants/app-constants');
const AWSPrometheusScraper = require('../controllers/scrapers/aws-prometheus-scraper');
const PrometheusDatabaseScraper = require('../controllers/scrapers/prometheus-database-scraper');

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

const awsState = new AWSPrometheusScraper(register)
const databaseState = new PrometheusDatabaseScraper(register)

const scraper = new prometheusDataCollector(register, awsState, databaseState);
scraper.scrapeData(callCount)
setInterval(() => {
    callCount = callCount + 5;
    scraper.scrapeData(callCount)
}, fiveMinutesInMilliseconds);

module.exports = { app }