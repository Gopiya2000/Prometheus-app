const { Gauge } = require("prom-client");

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
}

module.exports = GaugeMetricManager;