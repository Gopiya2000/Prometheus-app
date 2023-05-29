const queryService = require('../../services/common/query-service');
const { databaseParamsArray } = require("../../services/metrics");
const AbstractPrometheusCollector = require("./abstract-prometheus-collector");

class PrometheusDatabaseScraper extends AbstractPrometheusCollector {
    constructor(register, db) {
        super()
        this.register = register;
        this.dbQueryService = new queryService(db);
    }

    scrape(callCount) {
        databaseParamsArray.forEach(async (item) => {
            let gauge = await this.createGauge(item, this.register);
            this.getValue(gauge, item, callCount);
        })
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