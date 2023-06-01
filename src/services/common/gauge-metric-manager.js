const { Gauge } = require("prom-client");
const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const config = require("../../../config");

class GaugeMetricManager {
    constructor() {
        this.gaugeMap = new Map();
    }

    createGauge(params, register) {
        let gauge = this.gaugeMap.get(params.Name);
        if (!gauge) {
            gauge = new Gauge({
                name: params.Name,
                help: params.Help,
            });
            this.gaugeMap.set(params.Name, gauge);
            register.registerMetric(gauge);
        }
        return gauge;
    }

    async cloudwatch(item) {
        const client = new CloudWatchClient({ region: config.get('region') });
        const command = new GetMetricStatisticsCommand(item.params);
        const response = await client.send(command);
        return response;
    }
}

module.exports = GaugeMetricManager;