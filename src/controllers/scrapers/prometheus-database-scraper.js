const queryService = require('../../services/common/query-service');
const { databaseParamsArray } = require("../../services/metrics");
const AbstractPrometheusCollector = require("./abstract-prometheus-collector");

class PrometheusDatabaseScraper extends AbstractPrometheusCollector {
    constructor(register, scraper) {
        super()
        this.register = register;
        this.scraper = scraper;
        this.dbQueryService = new queryService();
    }

    async scrape(callCount, scraper) {
        databaseParamsArray.forEach(async (item) => {
            let gauge = await scraper.gaugeMetric.createGauge(item, this.register);
            this.getValue(gauge, item, callCount);
        })
        await scraper.setState(scraper.awsState)
    }

    async getValue(gauge, params) {
        const metricHandlers = {
            DBCount: this.dbQueryService.databaseCount.bind(this.dbQueryService),
            CollectionCount: this.dbQueryService.collectionCount.bind(this.dbQueryService)
        };
        const handler = metricHandlers[params.MetricName];
        const value = await handler(params.Value);
        this.setValue(gauge, value, params);
    }

    setValue(gauge, datapoint) {
        gauge.set(datapoint)

    }
}

module.exports = PrometheusDatabaseScraper;