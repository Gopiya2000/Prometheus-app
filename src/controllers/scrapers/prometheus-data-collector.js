const GaugeMetricManager = require("../../services/common/gauge-metric-manager")

class PrometheusDataCollector {
    constructor(register, awsState, databaseState) {
        this.register = register;
        this.awsState = awsState;
        this.databaseState = databaseState;
        this.dataController = this.awsState
        this.gaugeMetric = new GaugeMetricManager()
    }

    setState(newState) {
        this.dataController = newState;
    }
    scrapeData(callCount) {
        this.dataController.scrape(callCount, this);
    }
}

module.exports = PrometheusDataCollector;